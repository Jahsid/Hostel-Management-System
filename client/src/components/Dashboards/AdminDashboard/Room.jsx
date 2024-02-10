// RoomManagement.js
import { ShortCard } from "./Home/ShortCard";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminRoomDetails = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    roomNumber: '',
    capacity: '',
    occupancy: false,
  });

  useEffect(() => {
    // Fetch all rooms when the component mounts
    fetchAllRooms();
  }, []);

  const fetchAllRooms = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/room/getAll');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewRoom({
      ...newRoom,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setNewRoom({
      ...newRoom,
      [e.target.name]: e.target.checked,
    });
  };

  const handleCreateRoom = async () => {
    try {
      await axios.post('http://localhost:3000/api/room/create', newRoom);
      fetchAllRooms(); // Refresh the list after creating a new room
      setNewRoom({
        roomNumber: '',
        capacity: '',
        occupancy: false,
      });
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await axios.delete(`http://localhost:3000/api/room/delete/${roomId}`);
      fetchAllRooms(); // Refresh the list after deleting a room
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 items-center justify-start max-h-full overflow-x-hidden overflow-y-auto pt-[400px] sm:pt-96 md:pt-96 lg:pt-80 xl:pt-20">
      <h1 className="text-white font-bold text-5xl">Room Details</h1>
      <div className="flex w-full gap-5 sm:px-20 pt-5 flex-wrap items-center justify-center">
        {/* Statistics Cards */}
        <ShortCard title="Total Rooms" number={rooms.length} />
        <ShortCard title="Available Rooms" number={rooms.filter(room => !room.occupancy).length} />
        <ShortCard title="Occupied Rooms" number={rooms.filter(room => room.occupancy).length} />
      </div>
      <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl sm:w-[80%] w-full mt-5 max-h-full">
        <span className="text-white font-bold text-xl">All Rooms</span>

        {/* Render a list of rooms */}
        <ul className="mt-3">
          {rooms.map((room) => (
            <li key={room._id} className="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-2">
              <span className="text-white">{room.roomNumber}</span>
              <span className="text-white">{room.capacity} Capacity</span>
              <span className={`text-${room.occupancy ? 'red' : 'green'}-500`}> 
                {room.occupancy ? 'Occupied' : 'Available'}
              </span>
              <button
                onClick={() => handleDeleteRoom(room._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {/* Room creation form */}
        <div className="mt-5">
          <h2 className="text-white font-bold text-lg">Create New Room</h2>
          <div className="flex gap-3 mt-2">
            <input
              type="text"
              name="roomNumber"
              placeholder="Room Number"
              value={newRoom.roomNumber}
              onChange={handleInputChange}
              className="border px-2 py-1 rounded-md"
            />
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={newRoom.capacity}
              onChange={handleInputChange}
              className="border px-2 py-1 rounded-md"
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                name="occupancy"
                checked={newRoom.occupancy}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Occupied
            </label>
            <button
              onClick={handleCreateRoom}
              className="bg-green-500 text-white px-3 py-1 rounded-md"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRoomDetails;
