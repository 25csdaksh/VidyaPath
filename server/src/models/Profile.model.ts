import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  college?: string;
  branch?: string;
  graduationYear?: number;
  cgpa?: number;
  bio?: string;
  skills: string[];
  targetRoles: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    college: { type: String, trim: true },
    branch: { type: String, trim: true },
    graduationYear: { type: Number },
    cgpa: { type: Number, min: 0, max: 10 },
    bio: { type: String, maxLength: 500 },
    skills: [{ type: String, trim: true }],
    targetRoles: [{ type: String, trim: true }],
    githubUrl: { type: String, trim: true },
    linkedinUrl: { type: String, trim: true },
    portfolioUrl: { type: String, trim: true },
    resumeUrl: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

export const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);
