export abstract class DtoInput {
  abstract validate(value: DtoInput): void;
  //~ To make sure the data received is a DtoInput instance value
  abstract toInstance(value: DtoInput): DtoInput;
}
