import { useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';

const ACTIONS = {
  ADD: 'add',
  UPDATE: 'update',
  ERASE: 'erase',
};

const getNextSerial = (items) => items.length + 1;

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD:
      return [...state, { id: Date.now(), serial: getNextSerial(state), ...payload }];
    case ACTIONS.UPDATE:
      return state.map((item) => (item.id === payload.id ? { ...item, ...payload } : item));
    case ACTIONS.ERASE:
      return [];
    default:
      return state;
  }
};

function ItemListManager() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [items, dispatch] = useReducer(reducer, []);
  const [editId, setEditId] = useState(null);

  const handleAdd = (data) => dispatch({ type: ACTIONS.ADD, payload: data });
  const handleUpdate = (data) => dispatch({ type: ACTIONS.UPDATE, payload: { id: editId, ...data } });
  const handleErase = () => dispatch({ type: ACTIONS.ERASE });

  const onSubmit = (data) => {
    editId ? handleUpdate(data) : handleAdd(data);
    reset();
    setEditId(null);
  };

  const handleEdit = ({ id, name, description }) => {
    setEditId(id);
    reset({ name, description });
  };

  const InputField = ({ name, label, placeholder }) => (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        {...register(name, { required: `${label} is required` })}
        className="p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-800"
      />
      {errors[name] && <span className="text-red-600 text-sm">{errors[name].message}</span>}
    </div>
  );

  const Item = ({ id, serial, name, description }) => (
    <li
      key={id}
      className="p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 flex justify-between items-center"
    >
      <div>
        <span className="text-blue-600 dark:text-blue-400 font-medium">#{serial}</span>{' '}
        <span>{name}</span>: <span>{description}</span>
      </div>
      <button
        onClick={() => handleEdit({ id, name, description })}
        className="text-sm bg-yellow-500 text-white px-3 py-1 rounded"
      >
        Edit
      </button>
    </li>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-900 dark:text-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Listify</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InputField name="name" label="Item Name" placeholder="Enter name" />
          <InputField name="description" label="Item Description" placeholder="Enter description" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          {editId ? 'Update Item' : 'Add Item'}
        </button>
      </form>

      <button onClick={handleErase} className="w-full bg-red-600 text-white p-2 rounded mb-6">
        Erase All
      </button>

      <h2 className="text-xl font-semibold mb-3">Items</h2>
      {items.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No items yet.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemListManager;
