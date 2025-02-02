import { Model } from 'sequelize';
export class User extends Model {
    // Association with Ticket
    static associate(models) {
        User.hasMany(models.Ticket, {
            foreignKey: 'assignedUserId', // The foreign key in Ticket model
            as: 'tickets', // Alias for the association
        });
    }
}
