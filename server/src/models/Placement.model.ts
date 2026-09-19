import mongoose, { Document, Schema } from 'mongoose';

export interface IPlacement extends Document {
  companyName: string;
  logoUrl?: string;
  role: string;
  ctc: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'PPO';
  eligibilityCriteria: {
    minCgpa: number;
    allowedBranches: string[];
    graduationYear: number;
  };
  selectionRounds: string[];
  pastQuestions: {
    title: string;
    topic: string;
    difficulty: string;
    link?: string;
  }[];
  applicationDeadline: Date;
  applyUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PlacementSchema = new Schema<IPlacement>(
  {
    companyName: { type: String, required: true, trim: true, index: true },
    logoUrl: { type: String },
    role: { type: String, required: true, trim: true },
    ctc: { type: String, required: true },
    location: { type: String, default: 'Pan India / Remote' },
    type: { type: String, enum: ['Full-time', 'Internship', 'PPO'], default: 'Full-time' },
    eligibilityCriteria: {
      minCgpa: { type: Number, default: 7.0 },
      allowedBranches: [{ type: String, default: 'CSE' }],
      graduationYear: { type: Number },
    },
    selectionRounds: [{ type: String }],
    pastQuestions: [
      {
        title: { type: String },
        topic: { type: String },
        difficulty: { type: String },
        link: { type: String },
      },
    ],
    applicationDeadline: { type: Date, required: true },
    applyUrl: { type: String, required: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

export const Placement = mongoose.model<IPlacement>('Placement', PlacementSchema);
