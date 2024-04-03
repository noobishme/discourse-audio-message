import { withPluginApi } from "discourse/lib/plugin-api";
import AudioMessage from "../components/modal/audio-message";
import { getOwner } from "@ember/application";

function initializeWithApi(api) {
  const siteSettings = api.container.lookup("site-settings:main");

  if (siteSettings.audio_message_enabled) {
    api.modifyClass("component:d-editor", {
      pluginId: 'audio-message',
      actions: {
        showAudioMessageModal() {
                  getOwner(this)
          .lookup("service:modal")
          .show(AudioMessageModal, {
            model: { toolbarEvent: this.toolbarEvent },
          });
        }
      }
    });

    api.onToolbarCreate(tb => {
      tb.addButton({
        id: 'audio-message',
        group: 'extras',
        icon: 'microphone',
        shortcut: 'R',
        sendAction: () => tb.context.send('showAudioMessageModal')
      })
    });
  }
}

export default {
  name: "discourse-audio-message",

  initialize(owner) {
    withPluginApi("0.1", api => initializeWithApi(api));
  }
};
