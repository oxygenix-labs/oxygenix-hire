// Type definitions for Mongoose models to fix strict TypeScript errors
import { Model, Document } from "mongoose";

// This file helps TypeScript understand Mongoose model types better
// when using strict mode with noUncheckedIndexedAccess

export type MongooseModel<T> = Model<T & Document>;
