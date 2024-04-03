import { withPluginApi } from "discourse/lib/plugin-api";
import AudioMessage from "../components/modal/audio-message";
import { getOwner } from "@ember/application";

function initializeWithApi(api) {
  const siteSettings = api.container.lookup("site-settings:main");

  if (siteSettings.audio_message_enabled) {
    api.modifyClass("component:d-editor", {
      pluginId: 'discourse-audio-message',
      actions: {
        showAudioMessage() {
                  getOwner(this)
          .lookup("service:modal")
          .show(AudioMessage, {
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
        sendAction: () => tb.context.send('showAudioMessage')
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
