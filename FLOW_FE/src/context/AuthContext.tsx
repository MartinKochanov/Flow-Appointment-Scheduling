import { AxiosError } from "axios";
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useState,
} from "react";
import { useLogin } from "../hooks/useLoginMutation";
import { useRegister } from "../hooks/useRegisterMutation";
import { LoginCredentials, RegisterCredentials } from "../types/Credentials";
import { User } from "../types/User";

type ContextType = {
    authError: string | undefined;
    registrationError: string | undefined;
    auth: string | undefined;
    loginSubmitHandler: (values: LoginCredentials) => Promise<boolean>;
    registerSubmitHandler: (values: RegisterCredentials) => Promise<boolean>;
    logOutSubmitHandler: () => void;
    isLogingIn: boolean;
    isSigningUp: boolean;
    user: User | undefined;
    setCurrentUserInfo: (user: User | undefined) => void;
};

const AuthContext = createContext<ContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const initializeState = () => {
        const auth = localStorage.getItem("auth");
        if (auth) {
            return auth;
        }
        return undefined;
    };

    const [auth, setAuth] = useState<string | undefined>(initializeState);
    const [user, setUser] = useState<User | undefined>();
    const [authError, setAuthError] = useState<string | undefined>();
    const [registrationError, setRegistrationError] = useState<
        string | undefined
    >();

    const { mutateAsync: login, isPending: isLogingIn } = useLogin();
    const { mutateAsync: register, isPending: isSigningUp } = useRegister();

    const loginSubmitHandler = async (values: LoginCredentials) => {
        try {
            const data = await login(values);
            setAuth(data.token);
            localStorage.setItem("auth", data.token);
            setAuthError(undefined);
            return true;
        } catch (err) {
            const error = err as AxiosError;
            if (error.code === "ERR_BAD_REQUEST") {
                setAuthError("Wrong email or password");
            }
            return false;
        }
    };

    const registerSubmitHandler = async (values: RegisterCredentials) => {
        try {
            await register(values);
            setRegistrationError(undefined);
            return true;
        } catch (err) {
            const error = err as AxiosError;
            if (error.code === "ERR_BAD_REQUEST") {
                setRegistrationError(
                    Object.values(error.response?.data as {}).join("\n")
                );
            }
            return false;
        }
    };

    const logOutSubmitHandler = () => {
        setAuth(undefined);
        localStorage.removeItem("auth");
    };

    const setCurrentUserInfo = useCallback((user: User | undefined) => {
        setUser(user);
    }, []);

    const values: ContextType = {
        authError,
        registrationError,
        auth,
        loginSubmitHandler,
        registerSubmitHandler,
        logOutSubmitHandler,
        isLogingIn,
        isSigningUp,
        user,
        setCurrentUserInfo,
    };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};

export const useAuth = (): ContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;
