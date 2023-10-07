import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/books";
const initialState = {
  books: [],
  isLoading: false,
  error: null,
};

export const getAllBooks = createAsyncThunk("book/getBooks", async (args, thunkAPI) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const addBook = createAsyncThunk("book/addNewBook", async (book, thunkAPI) => {
  try {
    const response = await axios.post(url, book);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const editBook = createAsyncThunk("book/editBook", async (args, thunkAPI) => {
  const { bookId, updatedBook } = args;
  try {
    const response = await axios.put(`${url}/${bookId}`, updatedBook);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const deleteBook = createAsyncThunk("book/deleteBook", async (bookId, thunkAPI) => {
  try {
    await axios.delete(`${url}/${bookId}`);
    return bookId;
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});
export const getBookById = createSelector(
  (state) => state.books,
  (_, bookId) => bookId,
  (books, bookId) => books.find((book) => book.id === bookId)
);
const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllBooks.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    [getAllBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addBook.fulfilled]: (state, action) => {
      state.books.push(action.payload);
    },
    [editBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.books.push(action.payload);
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.books = state.books.filter((book) => book.id !== action.payload);
      console.log(state.books);
    },
  },
});

export const bookReducer = bookSlice.reducer;
export const bookActions = bookSlice.actions;
