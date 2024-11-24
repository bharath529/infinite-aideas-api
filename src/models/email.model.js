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
    },
    policyNumber: {
      type: String,
      trim: true, // Optional
    },
    policyId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Policy', // Optional
    },
    category: {
      type: String,
      enum: ['enquire', 'claim', 'feedback', 'others'],
      default: 'others', // Default value
    },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'resolved', 'blocked', 'ignored', 'approved', 'rejected', 'on hold', 'done'],
      default: 'in_progress', // Default value
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
    dynamicFields: {
      type: Object, // Field to store dynamic key-value pairs
      default: {}, // Default to an empty object
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
    strict: false, // Allow storing fields not explicitly defined in the schema
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
