<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <span class="p-1 text-xl text-white leading-none font-black"
              ><span>Engineering Hub</span
              ><span class="text-slate-50">.</span></span
            >
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <a
                href="/dashboard"
                class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                aria-current="page"
                >Dashboard</a
              >

              <a
                href="/users"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Users</a
              >
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <button
            type="button"
            :disabled="notificationsCount === 0"
            class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            @click="handleOnNotificationsButtonClick"
          >
            <span class="sr-only">View notifications</span>
            <!-- Heroicon name: outline/bell -->
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <div
              v-if="notificationsCount > 0"
              class="absolute top-1 right-10 px-1.5 py-0.5 bg-yellow-500 rounded-full text-xs text-white"
            >
              {{ notificationsCount }}
            </div>
            <div
              class="origin-top-right absolute right-10 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
              v-if="showNotificationsMenu"
            >
              <template
                v-for="(notification, index) in notifications"
                :key="index"
              >
                <div
                  class="block px-4 py-2 text-sm text-gray-700 text-left flex justify-between"
                  role="menuitem"
                  tabindex="-1"
                  :id="id"
                >
                  {{ notification.message }}
                  <button
                    type="button"
                    @click="handleOnNotificationDelete(notification._id)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      viewBox="0 0 24 24"
                      stroke="red"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </template>
            </div>
          </button>

          <!-- Profile dropdown -->
          <div class="ml-3 relative">
            <div>
              <button
                type="button"
                class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                @click="handleOnProfileButtonClick"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  :src="require(`@/assets/${avatar}.png`)"
                  alt="user"
                />
              </button>
            </div>
            <div
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
              v-if="showNavMenu"
            >
              <template
                v-for="(navDropdownItem, index) in navDropdownItems"
                :key="index"
              >
                <NavDropdownItem
                  :id="index.toString()"
                  :href="navDropdownItem.href"
                  :text="navDropdownItem.text"
                  :onClick="navDropdownItem.onClick"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <a
          href="#"
          class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
          aria-current="page"
          >Dashboard</a
        >

        <a
          href="#"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Team</a
        >

        <a
          href="#"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Projects</a
        >

        <a
          href="#"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Calendar</a
        >
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import NavDropdownItem from "../components/NavDropdownItem.vue";
import { useAuth } from "../modules/auth";
import { useApiWithAuth } from "../modules/api";
import { Notification } from "../interfaces/types";

interface NavigationState {
  notificationsCount: number;
  notifications: Notification[];
  showNotificationsMenu: boolean;
  showNavMenu: boolean;
}

interface INavDropdownItem {
  text: string;
  href: string;
  onClick: () => void;
}

export default defineComponent({
  components: { NavDropdownItem },
  props: {
    avatar: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { user, logout } = useAuth();
    const logoutUser = () => logout();

    const navigationState = reactive<NavigationState>({
      notificationsCount: 0,
      notifications: [],
      showNotificationsMenu: false,
      showNavMenu: false,
    });

    const fetchData = (): void => {
      const { get } = useApiWithAuth("/api/notifications/me?isRead=false");
      get().then((data) => {
        navigationState.notifications = data.notifications;
        navigationState.notificationsCount = data.notificationsCount;
      });
    };
    fetchData();

    const userNotificationsCount = computed(
      () => navigationState.notificationsCount
    );

    const navDropdownItems: INavDropdownItem[] = [
      {
        text: "Your Profile",
        href: "/profile",
        onClick: () => undefined,
      },
      {
        text: "Setting",
        href: "#",
        onClick: () => undefined,
      },
      {
        text: "Sign out",
        href: "/#",
        onClick: logoutUser,
      },
    ];

    const handleOnProfileButtonClick = (): void => {
      navigationState.showNavMenu = !navigationState.showNavMenu;
      navigationState.showNotificationsMenu = false;
    };

    const handleOnNotificationsButtonClick = (): void => {
      navigationState.showNotificationsMenu =
        !navigationState.showNotificationsMenu;
      navigationState.showNavMenu = false;
    };

    const handleOnNotificationDelete = (notificationId: string): void => {
      const { put } = useApiWithAuth(`/api/notifications/${notificationId}`);
      const paylod: { isRead: boolean } = {
        isRead: true,
      };
      put(paylod);
      fetchData();
    };

    return {
      user,
      userNotificationsCount,
      navDropdownItems,
      handleOnProfileButtonClick,
      handleOnNotificationsButtonClick,
      handleOnNotificationDelete,
      ...toRefs(navigationState),
    };
  },
});
</script>
