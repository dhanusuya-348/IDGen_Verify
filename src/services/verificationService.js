// backend/src/services/verificationService.js

const VerificationRecord = require('../models/VerificationRecord');
const User = require('../models/User');

class VerificationService {
  static async verifyUser(citizenshipId, serviceName) {
    try {
      // Find user by citizenship ID
      const user = await User.findOne({ citizenshipId });
      
      if (!user) {
        throw new Error('User not found');
      }

      if (!user.verified) {
        throw new Error('User is not verified');
      }

      // Create verification record
      const verificationRecord = await VerificationRecord.create({
        userId: user._id,
        requestingService: serviceName,
        verificationStatus: 'approved',
        verificationDate: new Date(),
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days validity
      });

      return {
        isValid: true,
        verificationId: verificationRecord._id,
        userData: {
          name: user.name,
          citizenshipId: user.citizenshipId,
          verificationDate: verificationRecord.verificationDate,
          expiryDate: verificationRecord.expiryDate
        }
      };
    } catch (error) {
      return {
        isValid: false,
        error: error.message
      };
    }
  }

  static async validateVerification(verificationId) {
    try {
      const record = await VerificationRecord.findById(verificationId)
        .populate('userId', 'name citizenshipId');

      if (!record) {
        throw new Error('Verification record not found');
      }

      if (record.expiryDate < new Date()) {
        throw new Error('Verification has expired');
      }

      return {
        isValid: true,
        data: {
          citizenshipId: record.userId.citizenshipId,
          name: record.userId.name,
          verificationDate: record.verificationDate,
          expiryDate: record.expiryDate,
          requestingService: record.requestingService
        }
      };
    } catch (error) {
      return {
        isValid: false,
        error: error.message
      };
    }
  }
}

module.exports = VerificationService;

// backend/src/routes/verification.js
const express = require('express');
const router = express.Router();
const VerificationService = require('../services/verificationService');
const auth = require('../middleware/auth');

// Endpoint for verifying a citizen
router.post('/verify', auth, async (req, res) => {
  const { citizenshipId, serviceName } = req.body;
  
  try {
    const result = await VerificationService.verifyUser(citizenshipId, serviceName);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint for validating a verification
router.get('/validate/:verificationId', auth, async (req, res) => {
  try {
    const result = await VerificationService.validateVerification(req.params.verificationId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;