import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThumbsUp, MessageSquare, UserPlus, ImageIcon, X } from "lucide-react";

type User = {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  following: boolean;
};

type Comment = {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
};

type Challenge = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  title: string;
  description: string;
  image: string | null;
  cheers: number;
  timestamp: string;
  comments: Comment[];
};

const challengeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.instanceof(File).optional(),
});

const commentSchema = z.object({
  text: z.string().min(1, "Comment cannot be empty"),
});

const placeholderUsers: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    bio: "Adventure seeker and recipe enthusiast",
    avatar: "AJ",
    following: false,
  },
  {
    id: "2",
    name: "Jamie Smith",
    bio: "Lover of heights and healthy living",
    avatar: "JS",
    following: true,
  },
  {
    id: "3",
    name: "Taylor Green",
    bio: "Foodie with a fear of spiders",
    avatar: "TG",
    following: false,
  },
];

const placeholderChallenges: Omit<Challenge, "comments">[] = [
  {
    id: "1",
    userId: "1",
    userName: "Alex Johnson",
    userAvatar: "AJ",
    title: "Cooking a New Recipe",
    description: "Trying a new Thai curry recipe tonight!",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cheers: 15,
    timestamp: "2025-04-20T14:30:00Z",
  },
  {
    id: "2",
    userId: "2",
    userName: "Jamie Smith",
    userAvatar: "JS",
    title: "Overcoming Fear of Heights",
    description: "Just climbed a small rock wall for the first time!",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cheers: 42,
    timestamp: "2025-04-19T10:15:00Z",
  },
  {
    id: "3",
    userId: "3",
    userName: "Taylor Green",
    userAvatar: "TG",
    title: "Learning to Skate",
    description: "First time on roller skates - wish me luck!",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cheers: 28,
    timestamp: "2025-04-18T16:45:00Z",
  },
];

const placeholderComments: Comment[] = [
  {
    id: "1",
    userId: "2",
    userName: "Jamie Smith",
    text: "Looks delicious! Would love the recipe",
    timestamp: "2025-04-20T14:45:00Z",
  },
  {
    id: "2",
    userId: "3",
    userName: "Taylor Green",
    text: "You got this! Heights are exhilarating",
    timestamp: "2025-04-19T10:30:00Z",
  },
  {
    id: "3",
    userId: "1",
    userName: "Alex Johnson",
    text: "What made you decide to try roller skates?",
    timestamp: "2025-04-18T17:00:00Z",
  },
];

const ChallengeFeed = () => {
  const [users, setUsers] = useState<User[]>(placeholderUsers);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "following">("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );
  const [mounted, setMounted] = useState(false);

  const challengeForm = useForm<z.infer<typeof challengeSchema>>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
    },
  });

  const commentForm = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      text: "",
    },
  });

  useEffect(() => {
    setMounted(true);

    const initialChallenges = placeholderChallenges.map((challenge) => ({
      ...challenge,
      comments: placeholderComments.filter(
        (comment) => comment.userId === challenge.userId
      ),
    }));

    setChallenges(initialChallenges);
  }, []);

  const getUserById = (id: string) =>
    users.find((user) => user.id === id) || placeholderUsers[0];

  const generateId = () => Date.now().toString(36) + Math.random().toString();

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const handleCreateChallenge = (data: z.infer<typeof challengeSchema>) => {
    const currentUser = users[0];

    const newChallenge: Challenge = {
      id: generateId(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      title: data.title,
      description: data.description,
      image: data.image ? URL.createObjectURL(data.image) : null,
      cheers: 0,
      timestamp: new Date().toISOString(),
      comments: [],
    };

    setChallenges([newChallenge, ...challenges]);
    challengeForm.reset();
  };

  const handleAddComment = (
    data: z.infer<typeof commentSchema>,
    challengeId: string
  ) => {
    if (!selectedChallenge) return;

    const currentUser = users[0];

    const newComment: Comment = {
      id: generateId(),
      userId: currentUser.id,
      userName: currentUser.name,
      text: data.text,
      timestamp: new Date().toISOString(),
    };

    const updatedChallenge = {
      ...selectedChallenge,
      comments: [...selectedChallenge.comments, newComment],
    };

    setSelectedChallenge(updatedChallenge);
    setChallenges(
      challenges.map((c) =>
        c.id === challengeId ? updatedChallenge : c
      ) as Challenge[]
    );
    commentForm.reset();
  };

  const handleToggleFollow = (userId: string) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, following: !user.following };
      }
      return user;
    });

    setUsers(updatedUsers);

    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({
        ...selectedUser,
        following: !selectedUser.following,
      });
    }
  };

  const handleToggleCheer = (challengeId: string) => {
    if (!selectedChallenge) return;

    const updatedChallenge = {
      ...selectedChallenge,
      cheers: selectedChallenge.cheers + 1,
    };

    setSelectedChallenge(updatedChallenge);
    setChallenges(
      challenges.map((c) =>
        c.id === challengeId ? updatedChallenge : c
      ) as Challenge[]
    );
  };

  const filteredChallenges = challenges.filter((challenge) => {
    if (activeTab === "following") {
      return getUserById(challenge.userId).following;
    }
    return true;
  });

  const sortedChallenges = [...filteredChallenges].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const userChallenges = selectedUser
    ? challenges.filter((challenge) => challenge.userId === selectedUser.id)
    : [];

  const currentUser = users[0];

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">
              Daily Challenges
            </h1>

            <div className="flex items-center gap-2">
              <Avatar
                className="h-8 w-8 cursor-pointer border border-gray-300"
                onClick={() => {
                  setSelectedUser(currentUser);
                  setSelectedChallenge(null);
                }}
              >
                <AvatarFallback className="bg-gray-100 text-gray-700">
                  {currentUser.avatar}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{currentUser.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="space-y-6 md:col-span-2">
          <div className="flex border-b border-gray-200">
            <button
              className={`pb-3 pt-2 px-4 font-medium transition-colors ${
                activeTab === "all"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Challenges
            </button>
            <button
              className={`pb-3 pt-2 px-4 font-medium transition-colors ${
                activeTab === "following"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("following")}
            >
              Following
            </button>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)] pr-4">
            <div className="space-y-6">
              {sortedChallenges.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-gray-500">
                    {activeTab === "all"
                      ? "No challenges yet. Be the first to post one!"
                      : "You're not following anyone yet. Follow users to see their challenges here."}
                  </p>
                </div>
              ) : (
                sortedChallenges.map((challenge) => (
                  <Card
                    key={challenge.id}
                    className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar
                            className="h-8 w-8 cursor-pointer border border-gray-300"
                            onClick={() => {
                              const user = getUserById(challenge.userId);
                              setSelectedUser(user);
                              setSelectedChallenge(null);
                            }}
                          >
                            <AvatarFallback className="bg-gray-100 text-gray-700">
                              {challenge.userAvatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg font-medium">
                              {challenge.title}
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500">
                              Posted by {challenge.userName} •{" "}
                              {formatTimestamp(challenge.timestamp)}
                            </CardDescription>
                          </div>
                        </div>
                        {challenge.userId !== currentUser.id && (
                          <Button
                            variant={
                              getUserById(challenge.userId).following
                                ? "secondary"
                                : "outline"
                            }
                            size="sm"
                            className="h-8 px-3 rounded-full"
                            onClick={() => handleToggleFollow(challenge.userId)}
                          >
                            {getUserById(challenge.userId).following
                              ? "Following"
                              : "Follow"}
                          </Button>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{challenge.description}</p>
                      {challenge.image && (
                        <div className="w-full h-64 overflow-hidden rounded-lg border border-gray-200">
                          <img
                            src={challenge.image || "/placeholder.svg"}
                            alt="Challenge"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="flex-col items-start space-y-3 pt-0 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-full"
                          onClick={() => {
                            setSelectedChallenge(challenge);
                            setSelectedUser(null);
                          }}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>
                            {challenge.cheers > 0 ? challenge.cheers : ""}
                          </span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-full"
                          onClick={() => {
                            setSelectedChallenge(challenge);
                            setSelectedUser(null);
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>
                            {challenge.comments.length > 0
                              ? challenge.comments.length
                              : ""}
                          </span>
                        </Button>
                      </div>

                      <div className="w-full pt-3 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Comments ({challenge.comments.length})
                        </h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {challenge.comments.length === 0 ? (
                            <p className="text-sm text-gray-500">
                              No comments yet. Be the first to congratulate!
                            </p>
                          ) : (
                            challenge.comments.map((comment) => (
                              <div
                                key={comment.id}
                                className="flex items-start space-x-2"
                              >
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="bg-gray-100 text-xs">
                                    {getUserById(comment.userId).avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="bg-gray-50 rounded-lg p-2 flex-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-sm">
                                      {comment.userName}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {formatTimestamp(comment.timestamp)}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700 mt-1">
                                    {comment.text}
                                  </p>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </section>

        <aside className="space-y-6">
          <Card className="border border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-lg font-medium text-gray-900">
                Share Your Challenge
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Form {...challengeForm}>
                <form
                  onSubmit={challengeForm.handleSubmit(handleCreateChallenge)}
                  className="space-y-4"
                >
                  <FormField
                    control={challengeForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="What's your challenge?"
                            className="border-gray-300 focus-visible:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={challengeForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Share details about your challenge"
                            className="min-h-[100px] border-gray-300 focus-visible:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={challengeForm.control}
                    name="image"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Image (optional)
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Input
                              {...field}
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                onChange(e.target.files?.[0] ?? undefined)
                              }
                              className="border-gray-300 focus-visible:ring-blue-500"
                            />
                            {value && (
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => onChange(undefined)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  >
                    Post Challenge
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {selectedUser && (
            <Card className="border border-gray-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-gray-50 border-b border-gray-200 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium text-gray-900">
                    {selectedUser.name}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedUser(null)}
                    className="h-7 px-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="text-gray-500">
                  {selectedUser.bio}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16 border border-gray-300">
                    <AvatarFallback className="bg-gray-100 text-gray-700 text-lg">
                      {selectedUser.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-lg">{selectedUser.name}</h3>
                    <p className="text-sm text-gray-500">{selectedUser.bio}</p>
                  </div>
                </div>

                <div className="flex justify-between mb-4">
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    {userChallenges.length} Challenges
                  </Badge>
                  <Button
                    variant={selectedUser.following ? "secondary" : "outline"}
                    size="sm"
                    className="h-8 px-3 rounded-full"
                    onClick={() => handleToggleFollow(selectedUser.id)}
                  >
                    {selectedUser.following ? "Following" : "Follow"}
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">
                    Recent Challenges
                  </h4>
                  {userChallenges.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      {selectedUser.name} hasn’t posted any challenges yet.
                    </p>
                  ) : (
                    userChallenges.slice(0, 3).map((challenge) => (
                      <div
                        key={challenge.id}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => setSelectedChallenge(challenge)}
                      >
                        {challenge.image ? (
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                            <img
                              src={challenge.image || "/placeholder.svg"}
                              alt={challenge.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                            <ImageIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm truncate w-40">
                            {challenge.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatTimestamp(challenge.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {selectedChallenge && (
            <Card className="border border-gray-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-gray-50 border-b border-gray-200 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium text-gray-900">
                    {selectedChallenge.title}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedChallenge(null)}
                    className="h-7 px-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="text-gray-500">
                  Posted by {selectedChallenge.userName} •{" "}
                  {formatTimestamp(selectedChallenge.timestamp)}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <p className="text-gray-700">{selectedChallenge.description}</p>
                {selectedChallenge.image && (
                  <div className="w-full h-48 overflow-hidden rounded-lg border border-gray-200">
                    <img
                      src={selectedChallenge.image || "/placeholder.svg"}
                      alt="Challenge"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center space-x-4 pt-3 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-full"
                    onClick={() => handleToggleCheer(selectedChallenge.id)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>
                      {selectedChallenge.cheers > 0
                        ? selectedChallenge.cheers
                        : ""}
                    </span>
                  </Button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Comments ({selectedChallenge.comments.length})
                  </h4>
                  <ScrollArea className="h-[200px] space-y-4 pr-4">
                    {selectedChallenge.comments.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        No comments yet. Be the first to congratulate!
                      </p>
                    ) : (
                      selectedChallenge.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="flex items-start space-x-3"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gray-100 text-xs">
                              {getUserById(comment.userId).avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-gray-50 rounded-lg p-3 flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm">
                                {comment.userName}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatTimestamp(comment.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mt-1">
                              {comment.text}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </ScrollArea>
                </div>

                <Form {...commentForm}>
                  <form
                    onSubmit={commentForm.handleSubmit((data) =>
                      handleAddComment(data, selectedChallenge.id)
                    )}
                    className="flex space-x-2 pt-4 border-t border-gray-200"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gray-100">
                        {currentUser.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex space-x-2">
                      <FormField
                        control={commentForm.control}
                        name="text"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Add a comment..."
                                className="flex-1 border-gray-300 focus-visible:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-red-500" />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white transition-colors rounded-full"
                      >
                        Post
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </aside>
      </main>
    </div>
  );
};

export default ChallengeFeed;
