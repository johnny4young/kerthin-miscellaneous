import { IBusAdapter } from '../interfaces/bus/bus-adapter.interface';
import { ICommandDto } from '../interfaces/commands/command-dto-interface';
import { ICommand } from '../interfaces/commands/command.interface';
import { IEventDto } from '../interfaces/events/event-dto.interface';
import { IEvent } from '../interfaces/events/event.interface';
import { Handler } from '../types';
import { getPrototypeName } from '../utils';

export class LocalBusAdapter implements IBusAdapter {
  private handlers: Map<string, Handler> = new Map<string, Handler>();

  setHandlers(handlers: Map<string, Handler>): this {
    this.handlers = handlers;
    return this;
  }

  // tslint:disable-next-line:no-empty
  init(): void { }

  publish(data: ICommand<ICommandDto> | IEvent<IEventDto>): any {
    const handler = this.handlers.get(getPrototypeName(data)) as Handler;

    if (!handler) {
      // TODO: pending add a error handler class
      // throw new CommandHandlerNotFoundException();
      throw new Error('The handler is not define.');
    }

    return handler.handle(data);
  }

}
