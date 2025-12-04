const db = require("./models");
const sequelize = db.sequelize;

async function main() {
    try {
        console.log("⏳ Șterg și reconstruiesc baza de date...");
        await sequelize.sync({ force: true });

        /*
         * 1. UTILIZATORI
         */
        const users = await db.User.bulkCreate([
            {
                nume: "Popescu",
                prenume: "Ana",
                email: "ana@test.com",
                parola: "1234",
                descriere: "Îmi place să gătesc."
            },
            {
                nume: "Ionescu",
                prenume: "Maria",
                email: "maria@test.com",
                parola: "1234",
                descriere: "Fan legume bio."
            },
            {
                nume: "Georgescu",
                prenume: "Andrei",
                email: "andrei@test.com",
                parola: "1234",
                descriere: "Gătesc prea mult, donez surplus!"
            },
            {
                nume: "Popa",
                prenume: "Bianca",
                email: "bianca@test.com",
                parola: "1234",
                descriere: "Iubesc mâncarea sănătoasă!"
            },
            {
                nume: "Dumitrescu",
                prenume: "Vlad",
                email: "vlad@test.com",
                parola: "1234",
                descriere: "Producător local de legume."
            }
        ]);

        const [Ana, Maria, Andrei, Bianca, Vlad] = users;
        console.log("✔ Utilizatori creați.");

        /*
         * 2. PRIETENII
         */
        await db.Prietenii.bulkCreate([
            { id_utilizator_1: Ana.id_utilizator, id_utilizator_2: Maria.id_utilizator, status_prietenie: 1 },
            { id_utilizator_1: Ana.id_utilizator, id_utilizator_2: Andrei.id_utilizator, status_prietenie: 1 }
        ]);

        console.log("✔ Prietenii create.");

        /*
         * 3. GRUP + MEMBRI
         */
        const grup = await db.Grup.create({
            id_admin: Maria.id_utilizator,
            nume_grup: "VeggieLovers",
            descriere: "Grup pentru pasionații de alimente sănătoase",
            status_dieta: "vegetarian"
        });

        await db.MembriGrup.bulkCreate([
            { id_grup: grup.id_grup, id_utilizator: Ana.id_utilizator },
            { id_grup: grup.id_grup, id_utilizator: Bianca.id_utilizator },
            { id_grup: grup.id_grup, id_utilizator: Vlad.id_utilizator }
        ]);

        console.log("✔ Grup și membri creați.");

        /*
         * 4. PRODUSE
         */
        const products = await db.Product.bulkCreate([
            {
                id_utilizator: Maria.id_utilizator,
                denumire_produs: "Pâine integrală",
                categorie: "Panificație",
                cantitate: 3,
                data_expirare: new Date("2025-06-10"),
                disponibil: true
            },
            {
                id_utilizator: Andrei.id_utilizator,
                denumire_produs: "Castraveți Bio",
                categorie: "Legume",
                cantitate: 8,
                data_expirare: new Date("2025-07-15"),
                disponibil: true
            },
            {
                id_utilizator: Bianca.id_utilizator,
                denumire_produs: "Granola de casă",
                categorie: "Mic dejun",
                cantitate: 2,
                data_expirare: new Date("2025-05-30"),
                disponibil: true
            },
            {
                id_utilizator: Vlad.id_utilizator,
                denumire_produs: "Roșii cherry",
                categorie: "Legume",
                cantitate: 12,
                data_expirare: new Date("2025-06-20"),
                disponibil: true
            }
        ]);

        const [Paine, Castraveti, Granola, RosiiCherry] = products;

        console.log("✔ Produse create.");

        /*
         * 5. SOLICITĂRI
         */
        await db.Solicitare.bulkCreate([
            // 0 = pending
            {
                id_produs: Paine.id_produs,
                id_solicitant: Ana.id_utilizator,
                status_solicitare: 0,
                nr_bucati: 1
            },
            // 1 = accepted
            {
                id_produs: Granola.id_produs,
                id_solicitant: Vlad.id_utilizator,
                status_solicitare: 1,
                nr_bucati: 1
            }
        ]);

        console.log("✔ Solicitări create.");

        /*
         * 6. TRANZACȚII
         */
        await db.Tranzactie.bulkCreate([
            {
                id_produs: Castraveti.id_produs,
                id_proprietar: Andrei.id_utilizator,
                id_beneficiar: Ana.id_utilizator,
                nr_bucati: 2,
                data_finalizare: new Date()
            },
            {
                id_produs: RosiiCherry.id_produs,
                id_proprietar: Vlad.id_utilizator,
                id_beneficiar: Ana.id_utilizator,
                nr_bucati: 5,
                data_finalizare: new Date()
            }
        ]);

        console.log("✔ Tranzacții create.");

        console.log("🎉 SEED COMPLET! Baza de date este populată corect.");
        process.exit(0);

    } catch (err) {
        console.error("❌ Eroare la seeding:", err);
        process.exit(1);
    }
}

main();
