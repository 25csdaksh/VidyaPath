import mongoose, { Document, Schema } from 'mongoose';

export interface IAnnouncement extends Document {
  title: string;
  category: 'Placement' | 'Hackathon' | 'Curriculum' | 'Workshop' | 'General';
  priority: 'low' | 'normal' | 'urgent';
  content: string;
  actionUrl?: string;
  actionLabel?: string;
  authorName: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Placement', 'Hackathon', 'Curriculum', 'Workshop', 'General'],
      default: 'General',
    },
    priority: { type: String, enum: ['low', 'normal', 'urgent'], default: 'normal' },
    content: { type: String, required: true },
    actionUrl: { type: String },
    actionLabel: { type: String },
    authorName: { type: String, default: 'CSE Department / Admin' },
    expiresAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const Announcement = mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
