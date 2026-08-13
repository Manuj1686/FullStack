import { useEffect, useState } from "react";

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

import { getPermissions } from "../utils/permissions";

export default function Dashboard() {
  const user = getUser();

  const [posts, setPosts] = useState([]);
  const [activity, setActivity] = useState([]);

  const userPermissions = getPermissions(user?.role);

  useEffect(() => {
    const savedPosts = loadPosts();
    const savedActivity = loadActivity();

    setPosts(
      Array.isArray(savedPosts)
        ? savedPosts
        : []
    );

    setActivity(
      Array.isArray(savedActivity)
        ? savedActivity
        : []
    );
  }, []);

  function refreshActivity() {
    const updatedActivity = loadActivity();

    setActivity(
      Array.isArray(updatedActivity)
        ? updatedActivity
        : []
    );
  }

  function handleActivity(message) {
    addActivity(message);
    refreshActivity();
  }

  function handleLogout() {
    logout();
    window.location.replace("/");
  }

  return (
    <DashboardLayout>

      <Navbar
        user={user}
        onLogout={handleLogout}
      />

      <div className="mx-auto max-w-[1500px] px-8 py-10">

        <Hero
          user={user}
        />

        <div className="mt-10">
          <QuickActions
            user={user}
            permissions={userPermissions}
          />
        </div>

        <div className="mt-10">
          <AnalyticsCards
            posts={posts}
            activity={activity}
          />
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-3">

          <div className="space-y-8 xl:col-span-2">

            {userPermissions.canCreate && (
              <PostComposer
                user={user}
                posts={posts}
                setPosts={setPosts}
                savePosts={savePosts}
                addActivity={handleActivity}
                permissions={userPermissions}
              />
            )}

            <PostFeed
              user={user}
              posts={posts}
              setPosts={setPosts}
              savePosts={savePosts}
              addActivity={handleActivity}
              permissions={userPermissions}
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