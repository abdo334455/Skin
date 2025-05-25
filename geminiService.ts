
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This check is more for development time. In a deployed environment,
  // process.env.API_KEY should be set.
  console.warn(
    "API_KEY is not set in environment variables. Gemini API calls will likely fail."
  );
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "MISSING_API_KEY" }); // Provide a fallback for initialization
                                                                    // to avoid crashing if API_KEY is undefined at startup.
                                                                    // The actual call will fail if the key is truly missing/invalid.

export const analyzeSkinImage = async (imageBase64: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API_KEY is not configured. Cannot call Gemini API.");
  }

  const model = 'gemini-2.5-flash-preview-04-17'; // This model supports image input

  const skinAnalysisPrompt = `
أنت خبير أمراض جلدية متخصص في المنتجات المصرية. سأقوم بتحميل صورة لجلد.
مهمتك هي:
1.  تحليل المشكلات الجلدية الظاهرة في الصورة بدقة.
2.  تقديم خطة علاج شاملة ومفصلة باللغة العربية الفصحى.
3.  تضمين أسماء منتجات وأدوية محددة متوفرة في السوق المصري، مع ذكر الشركات المصنعة إذا أمكن.
4.  شرح طريقة استخدام كل منتج أو دواء بالتفصيل (الجرعة، التكرار، مدة الاستخدام).
5.  تقديم نصائح إضافية للعناية بالبشرة ذات الصلة بالحالة.
6.  تنظيم الرد في فقرات واضحة وسهلة القراءة. ابدأ بالتشخيص ثم خطة العلاج ثم النصائح.
7.  التحذير بأن هذه استشارة أولية ولا تغني عن زيارة الطبيب المختص.

مثال على جزء من الرد المطلوب (لا تلتزم بهذا المثال حرفيا بل استخدمه كدليل للتنسيق واللغة):
"التشخيص المبدئي:
يبدو من الصورة وجود علامات لحب الشباب الالتهابي من الدرجة المتوسطة، مع بعض الرؤوس السوداء والبيضاء.

خطة العلاج المقترحة:
1.  غسول منظف: (اسم غسول مصري مناسب لحب الشباب)، يستخدم مرتين يومياً صباحاً ومساءً.
2.  كريم موضعي: (اسم كريم مصري يحتوي على مادة فعالة مثل البنزويل بيروكسايد أو الأدابالين)، يوضع طبقة رقيقة على المناطق المصابة مرة واحدة مساءً.
3.  مرطب: (اسم مرطب مصري خالي من الزيوت)، يستخدم بعد الغسول لترطيب البشرة.

نصائح إضافية:
- تجنب لمس الحبوب أو العبث بها.
- شرب كمية كافية من الماء.

تحذير:
هذه المعلومات هي لأغراض إرشادية فقط ولا تعتبر بديلاً عن الاستشارة الطبية المتخصصة. يجب مراجعة طبيب الجلدية لتقييم دقيق وخطة علاج شخصية."

الآن، قم بتحليل الصورة المرفقة وقدم الرد المطلوب.
`;

  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg', // Assuming JPEG, adjust if other types are common
      data: imageBase64,
    },
  };

  const textPart = {
    text: skinAnalysisPrompt,
  };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: { parts: [textPart, imagePart] },
      // No specific config like responseMimeType needed as we expect text based on prompt.
      // No thinkingConfig specified, will use default.
    });
    
    const analysisText = response.text;
    if (!analysisText) {
        throw new Error("Received an empty response from the AI.");
    }
    return analysisText;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes("API_KEY_INVALID")) {
        throw new Error("Invalid API Key. Please check your configuration.");
    }
    if (error instanceof Error && error.message.includes("Quota exceeded")) {
        throw new Error("API Quota Exceeded. Please check your Gemini API plan and usage.");
    }
    throw new Error(`AI service request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
};
    