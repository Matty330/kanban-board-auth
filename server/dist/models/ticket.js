import { Model } from 'sequelize';
export class Ticket extends Model {
    // Association with User
    static associate(models) {
        Ticket.belongsTo(models.User, {
            foreignKey: 'assignedUserId', // Link to the User by assignedUserId
            as: 'assignedUser', // Alias for the association
        });
    }
}
