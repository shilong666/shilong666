<template>
  <div
    class="cust-chat-message flex-dr"
    :class="{ 'flex-jce': props.role === 'user' }"
  >
    <div class="user-avatar" v-if="props.role === 'assistant'">
      <img :src="AiImage" />
    </div>
    <div
      class="message-box"
      :class="{ user: props.role === 'user', light: props.inputing }"
    >
      <span v-html="html"></span>
    </div>
    <div class="user-avatar" v-if="props.role === 'user'">
      <img :src="UserImage" />
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
  return DOMPurify.sanitize(markdown.render(props.message));
});
</script>

<style scoped lang="scss">
.cust-chat-message {
  padding: 10px;

  .user-avatar {
    width: 40px;
    height: 40px;

    img {
      width: inherit;
      height: inherit;
      border-radius: 40px;
    }
  }

  .message-box {
    --msgColor: #fff;
    background: var(--msgColor);
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
    padding: 10px;
    border-radius: 10px;
    margin-left: 10px;
    max-width: calc(100% - 40px);
    text-align: justify;
    word-break: break-all;
    position: relative;
    border: 1px solid transparent;
    // line-height: 18px;

    :deep(.hljs) {
      padding: 5px;
      code {
        white-space: break-spaces;
      }
    }
    :deep(ol) {
      list-style: none;
      padding-left: 10px;
      counter-reset: item;
      li {
        position: relative;
        padding-left: 8px;
      }
      li:before {
        content: counter(item) '. ';
        counter-increment: item;
        position: absolute;
        left: -8px;
        top: 2px;
      }
    }
  }
  .message-box.user {
    // background: #95ec69;
    --msgColor: #000;
    background: var(--msgColor);
    color: white;
    margin-right: 10px;
    margin-left: none;
  }
  .message-box.light {
    animation: ligitAmt linear 0.8s infinite;
    :deep(span) {
      > p:last-child,
      > ol:last-child li:last-child > p:last-child {
        position: relative;
        &::after {
          content: '';
          background: url('../../icons/loading.png') no-repeat;
          background-size: cover;
          width: 12px;
          height: 12px;
          animation: rate360 1s linear infinite;
          display: inline-block;
          vertical-align: baseline;
        }
      }
    }
  }
  .message-box::before {
    content: '';
    position: absolute;
    border-width: 10px;
    border-style: solid;
    border-color: transparent var(--msgColor) transparent transparent;
    top: 10px;
    /* 调整这个值来改变三角形的位置 */
    left: -18px;
    /* 让三角形居中 */
  }
  .message-box.user::before {
    left: auto;
    right: -18px;
    border-color: transparent transparent transparent var(--msgColor);
  }
}

@keyframes ligitAmt {
  0% {
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
  }

  50% {
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
  }

  100% {
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
  }
}
@keyframes rate360 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fade-in {
  animation: fadeIn 1s ease-in-out;
}
</style>
