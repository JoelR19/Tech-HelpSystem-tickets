import { TicketStatusEnum } from './ticket-status.enum';

describe('TicketStatusEnum', () => {
  it('should be defined', () => {
    expect(new TicketStatusEnum()).toBeDefined();
  });
});
