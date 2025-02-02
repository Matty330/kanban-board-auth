import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './User';  // Ensure correct casing for User import

interface TicketAttributes {
  id: number;
  name: string;
  status: string;
  description: string;
  assignedUserId?: number;
}

interface TicketCreationAttributes extends Optional<TicketAttributes, 'id'> {}

export class Ticket extends Model<TicketAttributes, TicketCreationAttributes> implements TicketAttributes {
  public id!: number;
  public name!: string;
  public status!: string;
  public description!: string;
  public assignedUserId?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association with User
  static associate(models: any) {
    Ticket.belongsTo(models.User, {
      foreignKey: 'assignedUserId',  // Link to the User by assignedUserId
      as: 'assignedUser',  // Alias for the association
    });
  }
}
