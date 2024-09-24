"use client";

import { useContext, createContext, useState } from "react";
import { useToasterContext } from "./ToasterContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import apiRoute from "@/api/routes";

interface AuthBody {
  email: string;
  password: string;
  setDisabled: (value: boolean) => void;
}

interface AccountData {
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
  createdBy: string;
  createdAt: string;
}

interface CredentialsFlowController {
  loginAction: (param: AuthBody) => void;
  logoutAction: () => void;
  roleAction: () => boolean;
  accData: AccountData | null;
  boardData: BoardData[];
  boardFetch: () => void;
  boardCreate: () => void;
  boardUpdate: (data: BoardData) => void;
  boardDelete: ({ boardId }: { boardId: string }) => void;
  listsData: ListData[];
  listsFetch: ({ boardId }: { boardId: string }) => void;
  listsCreate: ({ boardId }: { boardId: string }) => void;
  listsUpdate: ({ listId, data }: { listId: string; data: ListData }) => void;
  listsDelete: ({
    listId,
    boardId
  }: {
    listId: string;
    boardId: string;
  }) => void;
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
      .put(
        apiRoute.board.mainRoute,
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
        setBoardData(boardData);
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
      .put(
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

  const listsDelete = ({
    listId,
    boardId
  }: {
    listId: string;
    boardId: string;
  }) => {
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
        router.push("/" + boardId);

        // refetch list data
        listsFetch({ boardId });
      })
      .catch((err) => {
        console.log(err);
        toasterController.callToast({
          message: "Error menghapus list",
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
        listsDelete
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
