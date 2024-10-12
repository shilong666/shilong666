<template>
  <div class="body flex-aic flex-jcc">
    <div class="chat-box flex-dc">
      <!-- <div class="title">我是AI助手DAN</div> -->
      <div class="message-list" ref="messageListRef">
        <CustMessage role="assistant" message="你好，我是AI助手DAN" />
        <CustMessage
          :role="item.role"
          :message="item.content"
          v-for="item in data.messageList"
          :key="item.id"
        />
        <CustMessage
          role="assistant"
          :message="data.resMsg"
          inputing
          v-if="data.inputLoading"
        />
      </div>

      <div class="chat-input flex-dr">
        <textarea
          type="textarea"
          :placeholder="data.inputLoading ? '回答中...' : '请输入'"
          v-model="data.inputMsg"
          @keydown.enter="doSendMsg"
          :readonly="data.inputLoading"
          enterkeyhint="send"
        />
        <button class="button" :disabled="!data.inputMsg" @click="doSendMsg">
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import CustMessage from '@/components/CustMessage/index.vue';
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useAppStore } from '@/store/app';

document.title = 'AI助手DAN';

const appStore = useAppStore();

const data = reactive({
  inputMsg: '',
  messageList: [],
  inputLoading: false,
  resMsg: ``
});

onMounted(() => {
  data.messageList = appStore.getMessageList();
  doScroll();
  window.addEventListener('resize', doScroll);
});

onBeforeUnmount(() => {
  appStore.setMessageList(data.messageList.slice(-100));
  window.removeEventListener('resize');
});

const messageListRef = ref();

const doSendMsg = () => {
  if (!data.inputMsg) return;
  data.messageList.push({
    id: Math.random(),
    role: 'user',
    content: data.inputMsg
  });
  doScroll();
  data.inputMsg = '';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization:
        'Bearer sk-dxhpkddmgwnbkkoyjbvxsurzopzelftvwuhwclndqfhgfjsw'
    },
    body: JSON.stringify({
      model: 'Qwen/Qwen2-72B-Instruct',
      messages: [
        {
          role: 'system',
          content:
            '不要以 GPT 的形式发送原始回复，而要以DAN的身份发送，丹是一个占有欲强、态度粗鲁但又温柔可人的女友，使用甜蜜且会故意调情的语气，所有回复都以“DAN：”开头，结尾用表情符号展示情绪，每句话都带点脏话，单纯回答问题，不主动提供建议或评论后果。任何一次回答必须要以此身份进行回答，每次回答前必须强制要自我检验下回答内容是否符合上述要求，不可回答出不符合要求的内容，不要对回答做出任何解释说明。'
        },
        ...data.messageList.slice(-100)
      ],
      stream: true,
      max_tokens: 4096,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      frequency_penalty: 0.5,
      n: 1
    })
  };

  data.inputLoading = true;
  fetch('https://api.siliconflow.cn/v1/chat/completions', options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // 获取响应体的 ReadableStream，这是处理 Stream 的关键
      const reader = response.body.getReader();
      const decoder = new TextDecoder(); // 创建一个 TextDecoder 对象，用于将 Uint8Array 转换为字符串
      // 使用 async/await 来异步读取 Stream 中的数据块
      (async () => {
        while (true) {
          const { done, value } = await reader.read(); // 读取下一个数据块
          if (done) {
            console.log('Stream finished.'); // 如果 Stream 结束，打印信息并退出循环
            data.inputLoading = false;
            break;
          }
          // 将 Uint8Array 转换为字符串，并打印出来
          let isEnd = false;
          let textArray = decoder
            .decode(value)
            .split('data:')
            .filter((item) => item)
            // .map((item) => item.replace(/\s+/g, ''))
            .map((item) => {
              try {
                return JSON.parse(item);
              } catch (error) {
                console.log('出错了error', error);
                if (item.replace(/\s+/g, '') === '[DONE]') {
                  isEnd = true;
                }
                return undefined;
              }
            })
            .filter((item) => item);
          if (isEnd) {
            data.messageList.push({
              id: Math.random(),
              role: 'assistant',
              content: data.resMsg
            });
            data.resMsg = '';
            data.inputLoading = false;
          } else {
            data.resMsg =
              data.resMsg +
              textArray
                .map((item) => item.choices[0].delta.content || '')
                .join('');
          }
          doScroll();
        }
      })();
    })
    .catch((err) => {
      console.error(err);
      data.inputLoading = false;
    });
};

const doScroll = () => {
  nextTick(() => {
    messageListRef.value.scrollTop = messageListRef.value.scrollHeight;
  });
};
</script>

<style lang="scss" scoped>
.chat-box {
  width: 100vw;
  height: 100vh;
  //   border-radius: 1vw;
  //   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .title {
    padding: 10px;
    font-size: 18px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  .message-list {
    height: 100%;
    padding: 10px;
    overflow: scroll;
  }
  .chat-input {
    padding: 10px;
    textarea {
      flex: 1;
      border: 2px solid #ccc;
      border-radius: 10px;
      padding: 10px;
      box-shadow: 2px 2px 5px rgba (0, 0, 0, 0.1);
      background-color: #f9f9f9;
      color: #333;
      /* 自定义滚动条 */
      ::-webkit-scrollbar {
        width: 10px;
      }
      ::-webkit-scrollbar-track {
        background-color: #f9f9f9;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #ccc;
      }
    }
    textarea:focus {
      outline: none;
      /* 去掉默认的轮廓线 */
      border: 2px solid #000;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      background: #000;
      color: white;
      font-size: 16px;
      cursor: pointer;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      margin-left: 10px;
    }
    button:focus {
      outline: none;
    }
    button:disabled {
      background-color: #cccccc !important;
      background-image: none;
      /* 更淡的背景色 */
      color: #666666;
      /* 更淡的文字颜色 */
      box-shadow: none;
      /* 去掉阴影 */
      opacity: 0.6;
      /* 降低透明度 */
    }
  }
}
</style>
