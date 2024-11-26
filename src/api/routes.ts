const mainRoute = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3500/";
const authRoute = mainRoute + "auth/";
const authLoginRoute = authRoute + "login/";
const authRegisterRoute = authRoute + "register/";
const authLogoutRoute = authRoute + "logout/";
const authRoleRoute = authRoute + "role/";
const boardRoute = mainRoute + "board/";
const listsRoute = mainRoute + "lists/";
const cardsRoute = mainRoute + "cards/";
const commentsRoute = mainRoute + "comments/";

const apiRoute = {
  mainRoute: mainRoute,
  auth: {
    mainRoute: authRoute,
    loginRoute: authLoginRoute,
    registerRoute: authRegisterRoute,
    logoutRoute: authLogoutRoute,
    roleRoute: authRoleRoute
  },
  board: {
    mainRoute: boardRoute
  },
  lists: {
    mainRoute: listsRoute
  },
  cards: {
    mainRoute: cardsRoute
  },
  comments: {
    mainRoute: commentsRoute
  }
};

export default apiRoute;
