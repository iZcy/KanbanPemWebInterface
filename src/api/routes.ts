const mainRoute = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3500/";
const authRoute = mainRoute + "auth/";
const authLoginRoute = authRoute + "login/";
const authRegisterRoute = authRoute + "register/";
const authLogoutRoute = authRoute + "logout/";
const authRoleRoute = authRoute + "role/";
const authUserUpdate = authRoute + "update/";
const authUserDelete = authRoute + "delete/";
const authGetAllUsersNameId = authRoute + "users/";
const boardRoute = mainRoute + "board/";
const boardSingleRoute = boardRoute + "single/";
const listsRoute = mainRoute + "lists/";
const listsSingleRoute = listsRoute + "single/";
const cardsRoute = mainRoute + "cards/";
const cardsSingleRoute = cardsRoute + "card/";
const cardsCollabRoute = cardsRoute + "collab/";
const commentsRoute = mainRoute + "comments/";

const apiRoute = {
  mainRoute: mainRoute,
  auth: {
    mainRoute: authRoute,
    loginRoute: authLoginRoute,
    updateRoute: authUserUpdate,
    deleteRoute: authUserDelete,
    registerRoute: authRegisterRoute,
    logoutRoute: authLogoutRoute,
    roleRoute: authRoleRoute,
    getAllUsersNameIdRoute: authGetAllUsersNameId
  },
  board: {
    mainRoute: boardRoute,
    singleRoute: boardSingleRoute
  },
  lists: {
    mainRoute: listsRoute,
    singleRoute: listsSingleRoute
  },
  cards: {
    mainRoute: cardsRoute,
    collab: cardsCollabRoute,
    singleRoute: cardsSingleRoute
  },
  comments: {
    mainRoute: commentsRoute
  }
};

export default apiRoute;
