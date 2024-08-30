<template>
  <div
    class="cust-chat-message flex-dr"
    :class="{ 'flex-jce': props.role === 'user' }"
  >
    <div class="user-avatar" v-if="props.role === 'assistant'">
      <el-image :src="AiImage"></el-image>
    </div>
    <div
      class="message-box"
      :class="{ user: props.role === 'user', light: props.inputing }"
    >
      <span v-html="html"></span>
    </div>
    <div class="user-avatar" v-if="props.role === 'user'">
      <el-image :src="UserImage"></el-image>
    </div>
  </div>
</template>

<script setup>
import AiImage from '@/assets/ai.png';
import UserImage from '@/assets/user.png';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';
import { computed } from 'vue';

const markdown = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' +
      markdown.utils.escapeHtml(str) +
      '</code></pre>'
    );
  }
});

const props = defineProps({
  message: {
    type: String,
    default: () => ''
  },
  role: {
    type: String,
    default: () => ''
  },
  inputing: {
    type: Boolean,
    default: () => false
  }
});

const html = computed(() => {
  const val = markdown.render(props.message);
  return DOMPurify.sanitize(val);
});
</script>

<style scoped lang="scss">
.cust-chat-message {
  padding: 10px;

  .user-avatar {
    width: 40px;
    height: 40px;

    .ell-image {
      width: inherit;
      height: inherit;
      border-radius: 40px;
    }
  }

  .message-box {
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border-radius: 10px;
    margin: 0 10px;
    max-width: calc(100% - 120px);
    text-align: justify;
    word-break: break-all;
    position: relative;
    border: 1px solid transparent;
    // line-height: 18px;

    :deep(.hljs) {
      overflow-y: scroll;
      padding: 5px;
    }
  }
  .message-box.user {
    background: #95ec69;
  }
  .message-box.light {
    animation: ligitAmt linear 0.8s infinite;
  }
}

@keyframes ligitAmt {
  0% {
    box-shadow: 0 0 5px rgb(101, 191, 255);
  }

  50% {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  100% {
    box-shadow: 0 0 5px rgb(101, 191, 255);
  }
}
</style>
