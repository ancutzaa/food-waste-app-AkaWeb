const { Op } = require("sequelize");
const { Product, User, Prietenii, Solicitare, Notificare, MembriGrup} = require('../models');

exports.getFriendFeed = async (req, res) => {
    const currentUserId = req.query.userId; 

    if (!currentUserId) return res.status(400).json({ message: "userId este necesar." });

    try {
        const friendships = await Prietenii.findAll({
            where: {
                status_prietenie: 1, 
                [Op.or]: [
                    { id_utilizator_1: currentUserId },
                    { id_utilizator_2: currentUserId }
                ]
            }
        });

        let relevantUserIds = friendships.map(rel => {
            return rel.id_utilizator_1 == currentUserId ? rel.id_utilizator_2 : rel.id_utilizator_1;
        });

        const myGroups = await MembriGrup.findAll({
            where: { id_utilizator: currentUserId },
            attributes: ['id_grup']
        });
        const myGroupIds = myGroups.map(g => g.id_grup);

        if (myGroupIds.length > 0) {
            const groupMates = await MembriGrup.findAll({
                where: {
                    id_grup: { [Op.in]: myGroupIds },
                    id_utilizator: { [Op.ne]: currentUserId } 
                },
                attributes: ['id_utilizator']
            });

            groupMates.forEach(member => relevantUserIds.push(member.id_utilizator));
        }

        relevantUserIds = [...new Set(relevantUserIds)];

        const feedProducts = await Product.findAll({
            where: {
                id_utilizator: { [Op.in]: relevantUserIds }, 
                disponibil: true 
            },
            include: [
                { 
                    model: User,
                    as: 'owner', 
                    attributes: ['nume', 'email'] 
                }
            ],
            order: [['createdAt', 'DESC']] 
        });

        res.status(200).json(feedProducts);

    } catch (error) {
        console.error("Eroare Feed:", error);
        res.status(500).json({ message: "Eroare server.", error: error.message });
    }
};


