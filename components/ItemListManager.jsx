import React, { useReducer, useState } from 'react';
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
      return [
        ...state,
        {
          id: Date.now(),
          serial: getNextSerial(state),
          ...payload,
        },
      ];
    case ACTIONS.UPDATE:
      return state.map((item) =>
        item.id === payload.id ? { ...item, ...payload } : item
      );
    case ACTIONS.ERASE:
      return [];
    default:
      return state;
  }
};

function ItemListManager() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [items, dispatch] = useReducer(reducer, []);
  const [formState, setFormState] = useState({ editId: null });

  const onSubmit = (data) => {
    if (formState.editId) {
      dispatch({
        type: ACTIONS.UPDATE,
        payload: { id: formState.editId, ...data },
      });
    } else {
      dispatch({
        type: ACTIONS.ADD,
        payload: data,
      });
    }
    reset(); // Reset form after submit
    setFormState({ editId: null }); // Clear edit mode
  };

  const handleEdit = (item) => {
    setFormState({ editId: item.id });
    reset({
      name: item.name,
      description: item.description,
    });
  };

  const handleErase = () => {
    dispatch({ type: ACTIONS.ERASE });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-900 dark:text-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Listify</h1>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Item Name */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Item Name</label>
            <input
              type="text"
              placeholder="Enter name"
              {...register('name', { required: 'Item name is required' })}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-800"
            />
            {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
          </div>

          {/* Item Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Item Description</label>
            <input
              type="text"
              placeholder="Enter description"
              {...register('description', { required: 'Description is required' })}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-800"
            />
            {errors.description && <span className="text-red-600 text-sm">{errors.description.message}</span>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {formState.editId ? 'Update Item' : 'Add Item'}
        </button>
      </form>

      {/* Erase All Button */}
      <button
        onClick={handleErase}
        className="w-full bg-red-600 text-white p-2 rounded mb-6"
      >
        Erase All
      </button>

      {/* Item List */}
      <h2 className="text-xl font-semibold mb-3">Items</h2>
      {items.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No items yet.</p>
      ) : (
        <ul className="space-y-2">
          {items.map(({ id, serial, name, description }) => (
            <li
              key={id}
              className="p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 flex justify-between items-center"
            >
              <div>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  #{serial}
                </span>{' '}
                <span>{name}</span>: <span>{description}</span>
              </div>
              <button
                onClick={() => handleEdit({ id, name, description })}
                className="text-sm bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemListManager;
