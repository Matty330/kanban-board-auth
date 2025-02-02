import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association with Ticket
  static associate(models: any) {
    User.hasMany(models.Ticket, {
      foreignKey: 'assignedUserId', // The foreign key in Ticket model
      as: 'tickets', // Alias for the association
    });
  }
}
