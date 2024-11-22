const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const policySchema = mongoose.Schema(
  {
    policyNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    policyType: {
      type: String,
      enum: ['health', 'vehicle', 'life', 'property', 'other'],
      required: true,
    },
    coverageAmount: {
      type: Number,
      required: true,
    },
    premiumAmount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'cancelled'],
      default: 'active',
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true, // Optional if policy can exist without a user initially
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Add plugins to enable JSON conversion and pagination
policySchema.plugin(toJSON);
policySchema.plugin(paginate);

/**
 * @typedef Policy
 */
const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;
