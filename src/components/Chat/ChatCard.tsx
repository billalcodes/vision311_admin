import React from 'react';
import Link from "next/link";
import Image from "next/image";

// Chat type definition
type Chat = {
  active: boolean | null;
  avatar: string | null;
  name: string;
  text: string;
  time: string;
  textCount: number;
  dot: number;
  seen?: boolean;
};

// Sample chat data
const chatData: Chat[] = [
  {
    active: true,
    avatar: null,
    name: "Saleem Ahmad",
    text: "Hello, how are you?",
    time: "12 min",
    textCount: 3,
    dot: 3,
  },
  {
    active: true,
    avatar: null,
    name: "Shafiq Saleem",
    text: "I am waiting for you",
    time: "5:54 PM",
    textCount: 0,
    dot: 1,
  },
  {
    active: null,
    avatar: null,
    name: "Sobia",
    text: "Where are you now?",
    time: "10:12 PM",
    textCount: 0,
    dot: 3,
  },
  {
    active: true,
    seen: true,
    avatar: null,
    name: "Moiz",
    text: "Thank you so much!",
    time: "Sun",
    textCount: 2,
    dot: 6,
  },
  {
    active: false,
    avatar: null,
    name: "Ali",
    text: "Hello, how are you?",
    time: "Oct 23",
    textCount: 0,
    dot: 3,
  },
  {
    active: false,
    avatar: null,
    name: "Rabiya",
    text: "Hello, how are you?",
    time: "Oct 23",
    textCount: 0,
    dot: 3,
  },
];

// Generic user icon component
const GenericUserIcon: React.FC = () => (
  <svg
    className="h-14 w-14 text-gray-300"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

// ChatCard component
const ChatCard: React.FC = () => {
  return (
    <div className="col-span-12 rounded-[10px] bg-white py-6 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4">
      <h4 className="mb-5.5 px-7.5 text-body-2xlg font-bold text-dark dark:text-white">
        Chats
      </h4>

      <div>
        {chatData.map((chat, key) => (
          <Link
            href="/"
            className="flex items-center gap-4.5 px-7.5 py-3 hover:bg-gray-1 dark:hover:bg-dark-2"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full">
              {chat.avatar ? (
                <Image
                  width={56}
                  height={56}
                  src={chat.avatar}
                  alt="User"
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                />
              ) : (
                <GenericUserIcon />
              )}
              <span
                className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-dark-2 ${
                  chat.active === true
                    ? "bg-green"
                    : chat.active === false
                    ? `bg-red-light`
                    : "bg-orange-light"
                }`}
              ></span>
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-dark dark:text-white">
                  {chat.name}
                </h5>
                <p>
                  <span
                    className={`mb-px text-body-sm font-medium ${
                      chat.seen ? "dark:text-dark-3" : "text-dark-3 dark:text-dark-6"
                    }`}
                  >
                    {chat.text}
                  </span>
                  <span className="text-xs"> · {chat.time}</span>
                </p>
              </div>
              {chat.textCount !== 0 && (
                <div className="flex items-center justify-center rounded-full bg-primary px-2 py-0.5">
                  <span className="text-sm font-medium text-white">
                    {chat.textCount}
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatCard;