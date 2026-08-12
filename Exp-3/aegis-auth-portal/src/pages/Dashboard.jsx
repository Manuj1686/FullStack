import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/Dashboard/DashboardLayout";
import Navbar from "../components/Dashboard/Navbar";
import Hero from "../components/Dashboard/Hero";
import QuickActions from "../components/Dashboard/QuickActions";
import AnalyticsCards from "../components/Dashboard/AnalyticsCards";
import PostComposer from "../components/Dashboard/PostComposer";
import PostFeed from "../components/Dashboard/PostFeed";
import ActivityLog from "../components/Dashboard/ActivityLog";
import Footer from "../components/Dashboard/Footer";

import { getUser, logout } from "../utils/auth";

import {
  loadPosts,
  savePosts,
  loadActivity,
  addActivity,
} from "../utils/storage";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = getUser();

  const [posts, setPosts] = useState([]);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    setPosts(loadPosts());
    setActivity(loadActivity());

    addActivity("Logged In");
    setActivity(loadActivity());
  }, []);

  function refreshActivity() {
    setActivity(loadActivity());
  }

  function handleLogout() {
    addActivity("Logged Out");
    refreshActivity();

    logout();
    navigate("/");
  }

  return (
    <DashboardLayout>

      

      <div className="mx-auto max-w-[1500px] px-8 py-10">

        <Hero user={user} />

        <div className="mt-10">
          <QuickActions />
        </div>

        <div className="mt-10">
          <AnalyticsCards
            posts={posts}
            activity={activity}
          />
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-3">

          <div className="space-y-8 xl:col-span-2">

            <PostComposer
              user={user}
              posts={posts}
              setPosts={setPosts}
              savePosts={savePosts}
              addActivity={(message) => {
                addActivity(message);
                refreshActivity();
              }}
            />

            <PostFeed
              posts={posts}
              setPosts={setPosts}
              savePosts={savePosts}
              addActivity={(message) => {
                addActivity(message);
                refreshActivity();
              }}
            />

          </div>

          <ActivityLog
            activity={activity}
          />

        </div>

        <Footer />

      </div>

    </DashboardLayout>
  );
}