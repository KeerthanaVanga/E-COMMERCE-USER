import {
  Link,
  useSearchParams,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginThunk } from "../store/auth-actions";

const Login = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const mode = isLogin ? "login" : "signup";

    const result = await dispatch(loginThunk(formData, mode));

    if (result) {
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        <p className="prata-regular text-3xl">
          {isLogin ? "Login" : "Sign Up"}
        </p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {!isLogin && (
        <input
          type="text"
          className="w-full px-3 py-2 rounded-sm border border-gray-800"
          name="name"
          placeholder="Name"
          required
        />
      )}

      <input
        type="email"
        className="w-full px-3 py-2 rounded-sm border border-gray-800"
        name="email"
        placeholder="Email"
        required
      />
      <input
        type="password"
        className="w-full px-3 py-2 rounded-sm border border-gray-800"
        name="password"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password</p>
        <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
          {isLogin ? "Create account" : "Login"}
        </Link>
      </div>

      <button
        type="submit"
        className={`text-white font-light px-8 py-2 mt-4 ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black cursor-pointer"
        }`}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default Login;
