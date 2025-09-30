// import { ObjectId } from 'mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HABITS_STORE } from 'src/utils/constants';

//* Added
@Schema({
  collection: HABITS_STORE,
  //~ This tells Mongoose to add createdAt and updatedAt properties
  //   timestamps: true
})
export class MongooseHabitEntity {
  //* Removed
  //* Mongoose already knows these properties
  //   createdAt: Date;
  //~ Indicates this property will be saved in the DB
  @Prop()
  //~ Validation at DB level, it requires to restart the app
  //   @Prop({ unique: true, required: true })
  description?: string;

  @Prop()
  habitId: string;
  //   _id: ObjectId; //* This comes from the DB

  @Prop()
  name: string;
  //   updatedAt: Date;
}
//~ Mongoose doesn't work directly with TS classes
//~ Mongoose works with Schemas
export const MongooseHabitEntitySchema =
  SchemaFactory.createForClass(MongooseHabitEntity);
