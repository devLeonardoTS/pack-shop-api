import { PartialType } from "@nestjs/swagger";
import { CreateConsumerRequest } from "./create-consumer.request";

export class UpdateConsumerRequest extends PartialType(CreateConsumerRequest) {}
