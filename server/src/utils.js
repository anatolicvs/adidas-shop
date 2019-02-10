const SQL = require("sequelize");

module.exports.paginateResults = ({
    after: cursor,
    pageSize = 20,
    results,
    // can pass in a function to calculate an item's cursor
    getCursor = () => null,
}) => {
    if (pageSize < 1) return [];

    if (!cursor) return results.slice(0, pageSize);

    const cursorIndex = results.findIndex(item => {
        // if an item has a `cursor` on it, use that, otherwise try to generate one
        let itemCursor = item.cursor ? item.cursor : getCursor(item);

        // if there's still not a cursor, return false by default
        return itemCursor ? parseInt(cursor) === itemCursor : false;
    });

    return cursorIndex >= 0
        ? cursorIndex === results.length - 1 // don't let us overflow
            ? []
            : results.slice(
                cursorIndex + 3,
                Math.min(results.length, cursorIndex + 3 + pageSize),
            )
        : results.slice(0, pageSize);
    results.slice(cursorIndex >= 0 ? cursorIndex + 1 : 0, cursorIndex >= 0);
};

module.exports.createStore = () => {
    const Op = SQL.Op;
    const operatorsAliases = {
        $in: Op.in,
    };

    const db = new SQL('database', 'username', 'password', {
        dialect: 'sqlite',
        storage: './store.sqlite',
        operatorsAliases,
        logging: true,
    });

    const users = db.define('user', {
        id: {
            type: SQL.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        createdAt: SQL.DATE,
        updatedAt: SQL.DATE,
        email: SQL.STRING,
        token: SQL.STRING,
    });

    users.sync();

    const wishlist = db.define('wishlist', {
        id: {
            type: SQL.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        createdAt: SQL.DATE,
        updatedAt: SQL.DATE,
        productId: SQL.INTEGER,
        userId: SQL.INTEGER,
    });

    wishlist.sync();

    db.sync({ force: true });

    return { users, wishlist };
};

module.exports.textLogoAdidas = `
                  @@@@@@@@@
                   @@@@@@@@@
                    @@@@@@@@@
         @@@@@@@@@   @@@@@@@@@
          @@@@@@@@@   @@@@@@@@@
           @@@@@@@@@   @@@@@@@@@
@@@@@@@@@   @@@@@@@@@   @@@@@@@@@
 @@@@@@@@@   @@@@@@@@@   @@@@@@@@@
  @@@@@@@@@   @@@@@@@@@   @@@@@@@@@
`;
