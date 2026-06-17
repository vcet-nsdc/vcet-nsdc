import mongoose, { Schema, Document, Types } from 'mongoose';

export type FieldType =
  | 'text'
  | 'email'
  | 'phone'
  | 'select'
  | 'number'
  | 'file'
  | 'checkbox'
  | 'textarea';

export interface IFormField {
  key: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
  validation?: { min?: number; max?: number; pattern?: string };
  conditional?: { fieldKey: string; equals: string };
}

export interface IFormSchema extends Document {
  _id: Types.ObjectId;
  name: string;
  version: number;
  fields: IFormField[];
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FormFieldSchema = new Schema<IFormField>(
  {
    key: { type: String, required: true },
    label: { type: String, required: true },
    type: {
      type: String,
      enum: ['text', 'email', 'phone', 'select', 'number', 'file', 'checkbox', 'textarea'],
      required: true,
    },
    required: { type: Boolean, default: false },
    options: { type: [String], default: undefined },
    validation: {
      type: new Schema(
        { min: Number, max: Number, pattern: String },
        { _id: false }
      ),
      required: false,
    },
    conditional: {
      type: new Schema(
        { fieldKey: String, equals: String },
        { _id: false }
      ),
      required: false,
    },
  },
  { _id: false }
);

const FormSchemaSchema = new Schema<IFormSchema>(
  {
    name: { type: String, required: true, trim: true },
    version: { type: Number, default: 1 },
    fields: { type: [FormFieldSchema], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const FormSchemaModel =
  (mongoose.models.FormSchema as mongoose.Model<IFormSchema>) ||
  mongoose.model<IFormSchema>('FormSchema', FormSchemaSchema);

export default FormSchemaModel;
