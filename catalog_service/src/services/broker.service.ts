import { Consumer, Producer } from "kafkajs";
import { CatalogService } from "./catelog.service";
import { MessageBroker } from "../utils/broker";

export class BrokerService {
  private producer: Producer | null = null;
  private consumer: Consumer | null = null;
  private catalogService: CatalogService;

  constructor(catalogService: CatalogService) {
    this.catalogService = catalogService;
  }

  public async intializeBroker() {
    this.producer = await MessageBroker.connectProducer<Producer>();
    this.producer.on("producer.connect", async () => {
      console.log("Producer connected successfuly");
    });

    this.consumer = await MessageBroker.connectConsumer<Consumer>();
    this.consumer.on("consumer.connect", async () => {
      console.log("Consumer connected successfuly");
    });

    await MessageBroker.subscribe(
      this.catalogService.handleBrokerMessage.bind(this.catalogService),
      "CatalogEvents"
    );
  }

  public async sendDeleteProductMessage(data: any) {}
}
