import Empty from './Empty';

export default function Cart() {
  const cart = [];

  return (
    <div>
      {cart.length > 1 ? (
        <div></div>
      ) : (
        <div>
          <Empty />
        </div>
      )}
    </div>
  );
}
