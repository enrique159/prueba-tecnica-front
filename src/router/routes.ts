// MODULES
import { HomeRoutes } from "@/views/home/routes";
import { AuthRoutes } from "@/views/auth/routes";
import InvitationPreviewView from "@/views/Invitations/views/InvitationPreviewView.vue"

const routes = [
  ...AuthRoutes,
  ...HomeRoutes,
  {
    path: '/invitations/:id',
    name: 'InvitationPreview',
    component: InvitationPreviewView,
  },
]



export default routes