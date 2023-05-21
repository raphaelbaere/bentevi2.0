import useLoginModel from "@/hooks/useLoginModel";
import { useCallback, useState } from "react";
import Input from "../Input";
import Model from "../Model";
import useRegisterModel from "@/hooks/useRegisterModel";
import { signIn } from "next-auth/react";

const LoginModel = () => {
    const loginModel = useLoginModel();
    const registerModel = useRegisterModel();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await signIn('credentials', {
                email,
                password
            });

            loginModel.onClose();
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }, [loginModel, email, password])

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        loginModel.onClose();
        registerModel.onOpen();
    }, [isLoading, registerModel, loginModel])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
            placeholder="Email"
            onChange={(ev) => setEmail(ev.target.value)}
            value={email}
            disabled={isLoading}
            />
            <Input
            placeholder="Password"
            type="password"
            onChange={(ev) => setPassword(ev.target.value)}
            value={password}
            disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>First time using Bentevi? </p>
            <span
            className="
            text-white
            cursor-pointer
            hover:underline
            "
            onClick={onToggle}
            > 
            Create an account
            </span>
        </div>
    )

    return ( 
        <Model
        disabled={isLoading}
        isOpen={loginModel.isOpen}
        title="Login"
        actionLabel="Sign in"
        onClose={loginModel.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
        />
     );
}
 
export default LoginModel;