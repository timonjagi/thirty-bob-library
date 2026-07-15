import { useContext, useState } from 'react';
import { DrawerContext } from 'contexts/drawer/drawer.provider';
import Input from 'components/input';
import TextArea from 'components/textarea';

export default function RequestBook() {
  const { dispatch } = useContext(DrawerContext);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const hideRequest = () => {
    dispatch({
      type: 'TOGGLE_REQUEST_VIEW',
      payload: { showRequest: false },
    });
    dispatch({
      type: 'SLIDE_CART',
      payload: { open: false },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/request-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, name, email, notes }),
      });
      if (res.ok) {
        dispatch({
          type: 'TOGGLE_REQUEST_VIEW',
          payload: { showRequest: false },
        });
        dispatch({
          type: 'SLIDE_CART',
          payload: { open: false },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-90px bg-gray-100 flex justify-start items-center relative px-30px flex-shrink-0">
        <h3 className="font-semibold text-22px text-gray-900">Request a Book</h3>
        <button
          className="w-30px h-30px flex items-center justify-center text-gray-500 absolute right-25px focus:outline-none"
          onClick={hideRequest}
        >
          <svg width="12px" viewBox="0 0 12.8 12.8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.536 1.262a.427.427 0 0 0-.606 0L6.4 5.792 1.87 1.262a.427.427 0 0 0-.606.606L5.794 6.4l-4.53 4.53a.427.427 0 0 0 .606.606L6.4 7.006l4.53 4.53a.427.427 0 0 0 .606-.606L7.006 6.4l4.53-4.53a.427.427 0 0 0 0-.606z" fill="currentColor" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-30px py-30px">
        <p className="text-gray-600 text-14px mb-20px">
          Can't find what you're looking for? Tell us what you'd like to read and we'll try to source it for you.
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            label="Book Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            label="Author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Input
            label="Your Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Your Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextArea
            label="Additional Notes"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white text-14px font-semibold px-30px py-14px mt-20px rounded hover:bg-gray-800 transition-colors"
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
