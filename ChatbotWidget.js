
import React, { useEffect } from 'react';

const ChatbotWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://bots.kore.ai/api/platform/websdkjs/1502dc87208e4a86853487a5fd51039dd749776d6b5047cd8f385c21254f7d22st32';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    window.KoreSDK.show(window.KoreSDK.chatConfig);
  }, []);

  return null; 
};

export default ChatbotWidget;
