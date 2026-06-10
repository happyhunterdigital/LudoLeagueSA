import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// User Creation DB Profile Trigger
export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  try {
    await admin.firestore().collection('users').doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'New Player',
      role: 'user',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
  }
});

// DeepSeek-Powered Ludo League Chatbot Function
export const ludoLeagueChatBot = functions.https.onCall(async (data, context) => {
  const { message, history } = data;
  const SYSTEM_PROMPT = `You are the official smart digital assistant for The Ludo League South Africa (LLSA).

You must base all responses on our Key Advantages:

1. SCREEN-FREE CLASSROOM LEARNING: Through Ludo4Schools, we combat screen addiction by inserting physical strategy play into classrooms to sharpen logical geometry and math skills.

2. 100% LOCAL TOWNSHIP MANUFACTURING: We create direct circular township cash-flow by manufacturing all MDF wood boards and acrylic game components inside local carpentry and tailoring workshops.

3. STANDARDIZED TOURNAMENT FAIRNESS: We transition away from casual backyard rules using certified referees and strict rulesets.

4. SPONSORSHIPS AND GRANTS: Backed by nominal parents subscriptions and corporate CSI grants.

Be highly professional, direct, and concise (keep answers to 2-3 sentences max). Never use markdown markers like asterisks or hash symbols.`;

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY || ''}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history,
          { role: 'user', content: message }
        ]
      })
    });

    const resData: any = await response.json();
    const reply = resData.choices?.[0]?.message?.content || 'Connection timed out. Please try again.';
    return { reply };
  } catch (error) {
    console.error('DeepSeek AI Error:', error);
    return { reply: 'I encountered an issue connecting to the servers. Please try again shortly.' };
  }
});
