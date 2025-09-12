import { Buttons } from "../../components/Buttons/Buttons";
import { loadCartFromLocalStorage } from "../utils/utils";

export const Cart = () => {
  const results = loadCartFromLocalStorage("cart");
  const { count, result } = item;
  const handlerSubmit = () => {
    // тут должна быть функция отправки на бэк
    setShowModalCart(false);
  };

  return (
    // <div>Корзина</div>
    // <div>
    //             results?.map(item => {
    //     const{count, result: value} = item

    //     return(
    //         <div>
    //             <div>{result.name}</div>
    //             <div>{result}</div>
    //         </div>
    //     )
    // })
    // </div>

    <Buttons />
  );
};
