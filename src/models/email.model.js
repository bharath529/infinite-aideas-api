const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const emailSchema = mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    emailBody: {
      type: String,
      required: true,
    },
    senderEmail: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    policyNumber: {
      type: String,
      trim: true, // Made optional
    },
    policyId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Policy', // Made optional
    },
    category: {
      type: String,
      enum: ['enquire', 'claim', 'feedback', 'others'],
      default: 'others', // Default value
    },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'resolved', 'blocked', 'ignored'],
      default: 'new', // Default value
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium',
    },
    attachments: {
      type: [String], // Array for storing file paths or URLs
    },
    readByUser: {
      type: Boolean,
      default: false, // Track if the user has read the email
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Add plugin that converts mongoose to JSON
emailSchema.plugin(toJSON);
emailSchema.plugin(paginate);

// Add indexes for efficient querying
emailSchema.index({ user: 1 });
emailSchema.index({ category: 1 });
emailSchema.index({ status: 1 });

/**
 * @typedef Email
 */
const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
