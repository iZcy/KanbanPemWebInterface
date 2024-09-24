"use client";

import { useContext, createContext, useState } from "react";
import { useToasterContext } from "./ToasterContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import apiRoute from "@/api/routes";
import { enumDeadline } from "@/helper/typesEnums";

interface AuthBody {
  email: string;
  password: string;
  setDisabled: (value: boolean) => void;
}

interface AccountData {
  _id: string;
  email: string;
  username: string;
  role: "guest" | "member" | "admin";
}

interface BoardData {
  _id: string;
  title: string;
  userId: string;
  description: string;
  visibility: "private" | "public";
  createdAt: string;
}

interface ListData {
  _id: string;
  title: string;
  boardId: string;
  position: number;
  createdAt: string;
}

interface CardData {
  _id: string;
  title: string;
  listId: string;
  createdAt: string;
  dueDate: string;
  description: string;
  assignedTo: string[];
  status: enumDeadline;
}

interface CommentsData {
  _id: string;
  cardId: string;
  userId: string;
  content: string;
  isEdited: boolean;
}
interface CredentialsFlowController {
  loginAction: (param: AuthBody) => void;
  logoutAction: () => void;
  roleAction: () => boolean;
  accData: AccountData | null;
  boardData: BoardData[];
  lookingBoard: BoardData | null;
  setLookingBoard: React.Dispatch<React.SetStateAction<BoardData | null>>;
  boardFetch: () => void;
  boardCreate: () => void;
  boardUpdate: (data: BoardData) => void;
  boardDelete: ({ boardId }: { boardId: string }) => void;
  listsData: ListData[];
  lookingList: ListData | null;
  setLookingList: React.Dispatch<React.SetStateAction<ListData | null>>;
  listsFetch: ({ boardId }: { boardId: string }) => void;
  listsCreate: ({ boardId }: { boardId: string }) => void;
  listsUpdate: ({ listId, data }: { listId: string; data: ListData }) => void;
  listsDelete: ({ listId }: { listId: string }) => void;
  cardsData: CardData[];
  lookingCard: CardData | null;
  setLookingCard: React.Dispatch<React.SetStateAction<CardData | null>>;
  cardsFetch: ({ listId }: { listId: string }) => void;
  cardsCreate: ({ listId }: { listId: string }) => void;
  cardsUpdate: ({ cardId, data }: { cardId: string; data: CardData }) => void;
  cardsDelete: ({ cardId }: { cardId: string }) => void;
  commentsData: CommentsData[];
  commentsFetch: ({ cardId }: { cardId: string }) => void;
  commentsCreate: ({
    cardId,
    content
  }: {
    cardId: string;
    content: string;
  }) => void;
  commentsUpdate: ({
    commentId,
    data
  }: {
    commentId: string;
    data: CommentsData;
  }) => void;
  commentsDelete: ({ commentId }: { commentId: string }) => void;
  emptyAll: () => void;
}

const CredentialsContext = createContext<CredentialsFlowController | undefined>(
  undefined
);

export const CredentialsProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const toasterController = useToasterContext();

  const [accData, setAccData] = useState<AccountData | null>(null);
  const [boardData, setBoardData] = useState<BoardData[]>([]);
  const [listsData, setListsData] = useState<ListData[]>([]);
  const [cardsData, setCardsData] = useState<CardData[]>([]);
  const [commentsData, setCommentsData] = useState<CommentsData[]>([]);
  const [lookingBoard, setLookingBoard] = useState<BoardData | null>(null);
  const [lookingList, setLookingList] = useState<ListData | null>(null);
  const [lookingCard, setLookingCard] = useState<CardData | null>(null);

  const emptyAll = () => {
    setBoardData([]);
    setListsData([]);
    setCardsData([]);
    setCommentsData([]);
  };

  const roleAction = (): boolean => {
    axios
      .get(apiRoute.auth.roleRoute, {
        withCredentials: true
      })
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });

    return false;
  };

  const boardFetch = () => {
    toasterController.callToast({
      message: "Mengambil data board...",
      type: "info"
    });

    axios
      .get(apiRoute.board.mainRoute, {
        withCredentials: true
      })
      .then((res) => {
        const boardData = res.data.data as BoardData[];
        setBoardData(boardData);
        toasterController.callToast({
          message: "Sukses mengambil data board",
          type: "success"
        });
      })
      .catch((err) => {
        console.log(err);
        toasterController.callToast({
          message: "Error mengambil data board",
          type: "error"
        });
      });
  };

  const boardCreate = () => {
    toasterController.callToast({
      message: "Membuat board...",
      type: "info"
    });

    axios
      .post(
        apiRoute.board.mainRoute,
        {
          title: "New Board",
          description: "New Board Description",
          visibility: "private"
        },
        {
          withCredentials: true
        }
      )
      .then(() => {
        toasterController.callToast({
          message: "Sukses membuat board",
          type: "success"
        });
        // refetch board data
        boardFetch();
      })
      .catch((err) => {
        console.log(err);
        toasterController.callToast({
          message: "Error membuat board",
          type: "error"
        });
      });
  };

  const boardDelete = ({ boardId }: { boardId: string }) => {
    toasterController.callToast({
      message: "Menghapus board...",
      type: "info"
    });

    axios
      .delete(apiRoute.board.mainRoute + boardId, {
        withCredentials: true
      })
      .then(() => {
        toasterController.callToast({
          message: "Sukses menghapus board",
          type: "success"
        });
        // move to main page
        router.push("/main");

        // refetch board data
        boardFetch();
      })
      .catch((err) => {
        console.log(err);
        toasterController.callToast({
          message: "Error menghapus board",
          type: "error"
        });
      });
  };

  const boardUpdate = (data: BoardData) => {
    toasterController.callToast({
      message: "Mengupdate board...",
      type: "info"
    });

    axios
      .patch(
        apiRoute.board.mainRoute + data._id,
        {
          title: data.title,
          description: data.description,
          visibility: data.visibility
        },
        {
          withCredentials: true
        }
      )
      .then(() => {
        toasterController.callToast({
          message: "Sukses mengupdate board",
          type: "success"
        });

        // refetch board data
        boardFetch();
      })
      .catch((err) => {
        console.log(err);
        toasterController.callToast({
          message: "Error mengupdate board",
          type: "error"
        });
      });
  };

  const listsFetch = ({ boardId }: { boardId: string }) => {
    toasterController.callToast({
      message: "Mengambil data list...",
      type: "info"
    });

    axios
      .get(apiRoute.lists.mainRoute + boardId, {
        withCredentials: true
      })
      .then((res) => {
        const listsData = res.data.data as ListData[];

        toasterController.callToast({
          message: "Sukses mengambil data list",
          type: "success"
        });
        setListsData(listsData);
      })
      .catch((err) => {
        console.log(err);
        toasterController.callToast({
          message: "Error mengambil data list",
          type: "error"
        });
      });
  };

  const listsCreate = ({ boardId }: { boardId: string }) => {
    toasterController.callToast({
      message: "Membuat list...",
      type: "info"
    });

    axios
      .post(
        apiRoute.lists.mainRoute + boardId,
        {
          title: "New List",
          boardId: "New List Board",
          position: 0
        },
        {
          withCredentials: true
        }
      )
      .then(() => {
        toasterController.callToast({
          message: "Sukses membuat list",
          type: "success"
        });
        // refetch list data
        listsFetch({ boardId });
      })
      .catch((err) => {
        console.log(err);
        toasterController.callToast({
          message: "Error membuat list",
          type: "error"
        });
      });
  };

  const listsUpdate = ({
    listId,
    data
  }: {
    listId: string;
    data: ListData;
  }) => {
    toasterController.callToast({
      message: "Mengupdate list...",
      type: "info"
    });

    axios
      .patch(
        apiRoute.lists.mainRoute + listId,
        {
          title: data.title,
          boardId: data.boardId,
          position: data.position
        },
        {
          withCredentials: true
        }
      )
      .then(() => {
        toasterController.callToast({
          message: "Sukses mengupdate list",
          type: "success"
        });

        // refetch list data
        listsFetch({ boardId: data.boardId });
      })
      .catch((err) => {
        console.log(err);
        toasterController.callToast({
          message: "Error mengupdate list",
          type: "error"
        });
      });
  };

  const listsDelete = ({ listId }: { listId: string }) => {
    toasterController.callToast({
      message: "Menghapus list...",
      type: "info"
    });

    axios
      .delete(apiRoute.lists.mainRoute + listId, {
        withCredentials: true
      })
      .then(() => {
        toasterController.callToast({
          message: "Sukses menghapus list",
          type: "success"
        });
        // redirect to previous board
        router.push("/" + lookingBoard?._id);

        // refetch list data
        listsFetch({ boardId: lookingBoard?._id || "" });
      })
      .catch((err) => {
        console.log(err);
        toasterController.callToast({
          message: "Error menghapus list",
          type: "error"
        });
      });
  };

  const cardsFetch = ({ listId }: { listId: string }) => {
    toasterController.callToast({
      message: "Mengambil data card...",
      type: "info"
    });

    axios
      .get(apiRoute.cards.mainRoute + listId, {
        withCredentials: true
      })
      .then((res) => {
        console.log(res.data.data);
        setCardsData(res.data.data as CardData[]);
        toasterController.callToast({
          message: "Sukses mengambil data card",
          type: "success"
        });
      })
      .catch((err) => {
        console.log(err);
        toasterController.callToast({
          message: "Error mengambil data card",
          type: "error"
        });
      });
  };

  const cardsCreate = ({ listId }: { listId: string }) => {
    toasterController.callToast({
      message: "Membuat card...",
      type: "info"
    });

    axios
      .post(
        apiRoute.cards.mainRoute + listId,
        {
          title: "New Card",
          createdAt: new Date().toISOString(),
          dueDate: new Date().toISOString(),
          description: "New Card Description",
          assignedTo: []
        },
        {
          withCredentials: true
        }
      )
      .then(() => {
        toasterController.callToast({
          message: "Sukses membuat card",
          type: "success"
        });
        // refetch card data
        cardsFetch({ listId });
      })
      .catch((err) => {
        console.log(err);
        toasterController.callToast({
          message: "Error membuat card",
          type: "error"
        });
      });
  };

  const cardsUpdate = ({
    cardId,
    data
  }: {
    cardId: string;
    data: CardData;
  }) => {
    toasterController.callToast({
      message: "Mengupdate card...",
      type: "info"
    });

    axios
      .patch(
        apiRoute.cards.mainRoute + cardId,
        {
          title: data.title,
          dueDate: data.dueDate,
          description: data.description,
          assignedTo: data.assignedTo,
          status: data.status
        },
        {
          withCredentials: true
        }
      )
      .then(() => {
        toasterController.callToast({
          message: "Sukses mengupdate card",
          type: "success"
        });

        // refetch card data
        cardsFetch({ listId: data.listId });
      })
      .catch((err) => {
        console.log(err);
        toasterController.callToast({
          message: "Error mengupdate card",
          type: "error"
        });
      });
  };

  const cardsDelete = ({ cardId }: { cardId: string }) => {
    toasterController.callToast({
      message: "Menghapus card...",
      type: "info"
    });

    axios
      .delete(apiRoute.cards.mainRoute + cardId, {
        withCredentials: true
      })
      .then(() => {
        toasterController.callToast({
          message: "Sukses menghapus card",
          type: "success"
        });
        // back to previous list
        router.push("/" + lookingList?._id);

        // refetch card data
        cardsFetch({ listId: lookingList?._id || "" });
      })
      .catch((err) => {
        console.log(err);
        toasterController.callToast({
          message: "Error menghapus card",
          type: "error"
        });
      });
  };

  const commentsFetch = ({ cardId }: { cardId: string }) => {
    toasterController.callToast({
      message: "Mengambil data comment...",
      type: "info"
    });

    axios
      .get(apiRoute.comments.mainRoute + cardId, {
        withCredentials: true
      })
      .then((res) => {
        setCommentsData(res.data.data as CommentsData[]);
        toasterController.callToast({
          message: "Sukses mengambil data comment",
          type: "success"
        });
      })
      .catch((err) => {
        console.log(err);
        toasterController.callToast({
          message: "Error mengambil data comment",
          type: "error"
        });
      });
  };

  const commentsCreate = ({
    cardId,
    content
  }: {
    cardId: string;
    content: string;
  }) => {
    toasterController.callToast({
      message: "Membuat comment...",
      type: "info"
    });

    axios
      .post(
        apiRoute.comments.mainRoute + cardId,
        {
          content: content,
          userId: accData?._id
        } as CommentsData,
        {
          withCredentials: true
        }
      )
      .then(() => {
        toasterController.callToast({
          message: "Sukses membuat comment",
          type: "success"
        });
        // refetch comment data
        commentsFetch({ cardId });
      })
      .catch((err) => {
        console.log(err);
        toasterController.callToast({
          message: "Error membuat comment",
          type: "error"
        });
      });
  };

  const commentsUpdate = ({
    commentId,
    data
  }: {
    commentId: string;
    data: CommentsData;
  }) => {
    toasterController.callToast({
      message: "Mengupdate comment...",
      type: "info"
    });

    axios
      .patch(
        apiRoute.comments.mainRoute + commentId,
        {
          content: data.content,
          isEdited: true
        } as CommentsData,
        {
          withCredentials: true
        }
      )
      .then(() => {
        toasterController.callToast({
          message: "Sukses mengupdate comment",
          type: "success"
        });

        // refetch comment data
        commentsFetch({ cardId: data.cardId });
      })
      .catch((err) => {
        console.log(err);
        toasterController.callToast({
          message: "Error mengupdate comment",
          type: "error"
        });
      });
  };

  const commentsDelete = ({ commentId }: { commentId: string }) => {
    toasterController.callToast({
      message: "Menghapus comment...",
      type: "info"
    });

    axios
      .delete(apiRoute.comments.mainRoute + commentId, {
        withCredentials: true
      })
      .then(() => {
        toasterController.callToast({
          message: "Sukses menghapus comment",
          type: "success"
        });
        // refetch comment data
        commentsFetch({ cardId: lookingCard?._id || "" });
      })
      .catch((err) => {
        console.log(err);
        toasterController.callToast({
          message: "Error menghapus comment",
          type: "error"
        });
      });
  };

  const loginAction = (param: AuthBody) => {
    toasterController.callToast({
      message: "Mencoba login...",
      type: "info"
    });
    param.setDisabled(true);

    axios
      .post(
        apiRoute.auth.loginRoute,
        {
          email: param.email,
          password: param.password
        },
        {
          withCredentials: true
        }
      )
      .then((res) => {
        const userData = res.data.user as AccountData;
        setAccData(userData);
        toasterController.callToast({
          message:
            "Sukses: " + (res?.data?.data || "(pesan hilang, hubungi Admin!)"),
          type: "success"
        });
        router.push("/main");
      })
      .catch((err) => {
        console.log(err);
        toasterController.callToast({
          message:
            "Error: " +
            (err?.response?.data?.data || "(pesan hilang, hubungi Admin!)"),
          type: "error"
        });
        param.setDisabled(false);
      });
  };

  const logoutAction = () => {
    // inform loading
    toasterController.callToast({
      message: "Sedang memproses...",
      type: "info"
    });

    axios
      .get(apiRoute.auth.logoutRoute, {
        withCredentials: true
      })
      .then(() => {
        // delete user data
        setAccData(null);
        emptyAll();

        // inform success
        toasterController.callToast({
          message: "Berhasil keluar",
          type: "success"
        });

        // redirect to home
        router.push("/auth");
      })
      .catch((err) => {
        // Inform
        toasterController.callToast({
          message: "Gagal keluar",
          type: "error"
        });
        console.log(err);

        // redirect to home
        router.push("/auth");
      });
  };

  return (
    <CredentialsContext.Provider
      value={{
        loginAction,
        logoutAction,
        roleAction,
        accData,
        boardData,
        boardFetch,
        boardCreate,
        boardUpdate,
        boardDelete,
        listsData,
        listsFetch,
        listsCreate,
        listsUpdate,
        listsDelete,
        cardsData,
        cardsFetch,
        cardsCreate,
        cardsUpdate,
        cardsDelete,
        commentsData,
        commentsFetch,
        commentsCreate,
        commentsUpdate,
        commentsDelete,
        emptyAll,
        lookingBoard,
        setLookingBoard,
        lookingList,
        setLookingList,
        lookingCard,
        setLookingCard
      }}
    >
      {children}
    </CredentialsContext.Provider>
  );
};

export const useCredentialsContext = (): CredentialsFlowController => {
  const context = useContext(CredentialsContext);
  if (context === undefined) {
    throw new Error(
      "useCredentialsContext must be used within a CredentialsProvider"
    );
  }
  return context;
};
