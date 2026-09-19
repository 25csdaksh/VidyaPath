import mongoose, { Document, Schema } from 'mongoose';

export interface IHackathon extends Document {
  title: string;
  organizer: string;
  bannerUrl?: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  location?: string;
  startDate: Date;
  deadline: Date;
  prizePool: string;
  teamSize: string;
  tags: string[];
  registrationUrl: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const HackathonSchema = new Schema<IHackathon>(
  {
    title: { type: String, required: true, trim: true },
    organizer: { type: String, required: true, trim: true },
    bannerUrl: { type: String },
    mode: { type: String, enum: ['Online', 'Offline', 'Hybrid'], default: 'Online' },
    location: { type: String },
    startDate: { type: Date, required: true },
    deadline: { type: Date, required: true },
    prizePool: { type: String, default: 'Certificates & Swags' },
    teamSize: { type: String, default: '1-4 Members' },
    tags: [{ type: String, trim: true }],
    registrationUrl: { type: String, required: true },
    isVerified: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Hackathon = mongoose.model<IHackathon>('Hackathon', HackathonSchema);
