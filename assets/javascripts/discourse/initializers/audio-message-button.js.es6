import { withPluginApi } from "discourse/lib/plugin-api";
import AudioMessage from "../components/modal/audio-message";
import { getOwner } from "@ember/application";

function initializeAudioMessage(api) {
  api.modifyClass("controller:composer", {
    pluginId: "discourse-audio-message",
    actions: {
      showAudioMessage() {
                getOwner(this)
        .lookup("service:modal")
        .show(AudioMessage, {
          model: { toolbarEvent: this.toolbarEvent },
         });
       }
     }
   }),

    api.addToolbarPopupMenuOptionsCallback(() => {
      return {
        action: "showAudioMessage",
        id: "audio-message",
        group: "extras",
        icon: "microphone",
        shortcut: "R",
      };
    });
  }
}

export default {
  name: "audio-message-button",

  initialize() {
    withPluginApi("0.8.7", initializeAudioMessage);
  }
};
