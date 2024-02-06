import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AlertTitle,
  Chip,
  InputAdornment,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Outbox, CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material";

const sliderData_en = {
  "How would you rate the quality of the cattle feed products you currently deal with?":
    "rateCattleFeed",
  "What specific features or attributes of cattle feed do your customers appreciate the most?":
    "cattleFeedCustomerAppreciate",
  "Which cattle feed brands have a strong reputation in the market, according to your customers?":
    "cattleFeedBrand",
  "In your opinion, what factors contribute to a cattle feed brand's positive reputation?":
    "cattleFeedpositiveReputation",
  "How extensive is your current distribution network for cattle feed products?":
    "extensiveDistributionNetwork",
  "Can you highlight any areas where your distribution network is particularly strong?":
    "areaDistributionNetworkStrong",
  "Are there any common challenges or complaints from customers regarding existing cattle feed products?":
    "challengeFromCustomer",
  "What areas do you think the current cattle feed products are lacking in terms of meeting customer needs?":
    "lackinginCustomerNeeds",
  "Do you face any logistical challenges in terms of transportation, storage, or delivery of cattle feed?":
    "logisticChallenges",
  "Are there specific regions where your logistics face more difficulties?":
    "areaWhereLogisticIssue",
  "How do you perceive the pricing of existing cattle feed products in the market?":
    "preceivePricing",
  "Are there price-related concerns or challenges you encounter when dealing with cattle feed?":
    "priceRelatedConcern",
  "Have you observed any emerging trends or preferences in the cattle feed market?":
    "emergingTrend",
  "Are there specific types of cattle feed products that seem to be gaining popularity?":
    "cattleFeedType",
  "Are there gaps or unmet needs in the current cattle feed offerings that you've identified?":
    "unmetNeeds",
  "Can you suggest any specific features or formulations that could address unmet customer needs?":
    "featureOrFormula",
  "How loyal are customers to specific cattle feed brands, and is there a risk of losing customers to competitors?":
    "customerLoyality",
  "Are there any factors that might lead to customer dissatisfaction or switching to other brands?":
    "customerDissatisfaction",
  "Dealer Name *": "dealerName",
  "Dealer Address *": "dealerAddress",
  "Dealer Mobile Number": "dealerPhone",
  "Do you have any suggestions or feedback for potential entrants into the cattle feed industry?":
    "suggestionAndFeedback",
  "What improvements or innovations would you like to see in cattle feed products?":
    "improvementOrInnovation",
  "Would you be open to forming partnerships with a new entrant in the cattle feed industry?":
    "FormingPartnership",
  "What criteria would you consider when selecting a partner for cattle feed distribution?":
    "criteriaForPartnership",
};

const sliderData_hn = {
  "आप वहाँ उपस्थित जीवाशीत के उत्पादों की गुणवत्ता को कैसे मूल्यांकित करेंगे?":
    "rateCattleFeed",
  "जीवाशीत के भोजन के विशिष्ट विशेषताओं या गुणों की ओर आपके ग्राहकों का सबसे अधिक मूल्यांकन कौन-कौन सी विशेषताएँ या गुणे करते हैं?":
    "cattleFeedCustomerAppreciate",
  "आपके ग्राहकों के अनुसार, कौन से पशु आहार ब्रांड की बाज़ार में अच्छी प्रतिष्ठा है?":
    "cattleFeedBrand",
  "आपकी राय में, पशु आहार ब्रांड की सकारात्मक प्रतिष्ठा में कौन से कारक योगदान करते हैं?":
    "cattleFeedpositiveReputation",
  "पशु चारा उत्पादों के लिए आपका वर्तमान वितरण नेटवर्क कितना व्यापक है?":
    "extensiveDistributionNetwork",
  "क्या आप ऐसे किसी क्षेत्र को उजागर कर सकते हैं जहां आपका वितरण नेटवर्क विशेष रूप से मजबूत है?":
    "areaDistributionNetworkStrong",
  "क्या मौजूदा पशु चारा उत्पादों के संबंध में ग्राहकों की ओर से कोई आम चुनौतियाँ या शिकायतें हैं?":
    "challengeFromCustomer",
  "आपको क्या लगता है कि ग्राहकों की जरूरतों को पूरा करने के मामले में वर्तमान पशु चारा उत्पादों में किन क्षेत्रों की कमी है?":
    "lackinginCustomerNeeds",
  "क्या आपको पशुचारे के परिवहन, भंडारण या वितरण के मामले में किसी तार्किक चुनौती का सामना करना पड़ता है?":
    "logisticChallenges",
  "क्या ऐसे विशिष्ट क्षेत्र हैं जहां आपके लॉजिस्टिक्स को अधिक कठिनाइयों का सामना करना पड़ता है?":
    "areaWhereLogisticIssue",
  "आप बाज़ार में मौजूदा पशु आहार उत्पादों की कीमत को किस प्रकार समझते हैं?":
    "preceivePricing",
  "क्या मवेशियों के चारे के साथ व्यवहार करते समय आपको मूल्य-संबंधी चिंताएँ या चुनौतियाँ आती हैं?":
    "priceRelatedConcern",
  "क्या आपने पशु चारा बाज़ार में कोई उभरता हुआ रुझान या प्राथमिकताएँ देखी हैं?":
    "emergingTrend",
  "क्या ऐसे विशिष्ट प्रकार के पशु आहार उत्पाद हैं जो लोकप्रियता प्राप्त कर रहे हैं?":
    "cattleFeedType",
  "क्या आपके द्वारा पहचानी गई वर्तमान पशु आहार पेशकश में कोई कमियां या अधूरी जरूरतें हैं?":
    "unmetNeeds",
  "क्या आप कोई विशिष्ट विशेषता या फॉर्मूलेशन सुझा सकते हैं जो ग्राहकों की अधूरी जरूरतों को पूरा कर सके?":
    "featureOrFormula",
  "विशिष्ट पशु आहार ब्रांडों के प्रति ग्राहक कितने वफादार हैं, और क्या प्रतिस्पर्धियों के कारण ग्राहकों को खोने का जोखिम है?":
    "customerLoyality",
  "क्या ऐसे कोई कारक हैं जो ग्राहक के असंतोष या अन्य ब्रांडों पर स्विच करने का कारण बन सकते हैं?":
    "customerDissatisfaction",
  "विक्रेता का नाम *": "dealerName",
  "डीलर का पता *": "dealerAddress",
  "डीलर मोबाइल नंबर": "dealerPhone",
  "क्या आपके पास पशु चारा उद्योग में संभावित प्रवेशकों के लिए कोई सुझाव या प्रतिक्रिया है?":
    "suggestionAndFeedback",
  "आप पशु चारा उत्पादों में क्या सुधार या नवाचार देखना चाहेंगे?":
    "improvementOrInnovation",
  "क्या आप पशु चारा उद्योग में किसी नए खिलाड़ी के साथ साझेदारी बनाने के लिए तैयार हैं?":
    "FormingPartnership",
  "पशु चारा वितरण के लिए भागीदार का चयन करते समय आप किन मानदंडों पर विचार करेंगे?":
    "criteriaForPartnership",
};

const SurveyCard = () => {
  const [surveyData, setSurveyData] = useState({
    rateCattleFeed: 0,
    cattleFeedCustomerAppreciate: [],
    cattleFeedBrand: "",
    cattleFeedpositiveReputation: [],
    extensiveDistributionNetwork: "",
    areaDistributionNetworkStrong: [],
    challengeFromCustomer: [],
    lackinginCustomerNeeds: [],
    logisticChallenges: [],
    areaWhereLogisticIssue: [],
    preceivePricing: [],
    priceRelatedConcern: [],
    emergingTrend: [],
    cattleFeedType: [],
    unmetNeeds: [],
    featureOrFormula: [],
    customerLoyality: 0,
    customerDissatisfaction: [],
    dealerName: "",
    dealerAddress: "",
    dealerPhone: "",
    suggestionAndFeedback: "",
    improvementOrInnovation: "",
    FormingPartnership: false,
    criteriaForPartnership: [],
  });

  const [showInput, setShowInput] = useState({
    cattleFeedCustomerAppreciate: false,
    cattleFeedpositiveReputation: false,
    areaDistributionNetworkStrong: false,
    challengeFromCustomer: false,
    lackinginCustomerNeeds: false,
    logisticChallenges: false,
    areaWhereLogisticIssue: false,
    preceivePricing: false,
    priceRelatedConcern: false,
    emergingTrend: false,
    cattleFeedType: false,
    unmetNeeds: false,
    featureOrFormula: false,
    customerDissatisfaction: false,
    criteriaForPartnership: false,
  });

  const [otherInput, setOtherInput] = useState({
    cattleFeedCustomerAppreciate: null,
    cattleFeedpositiveReputation: null,
    areaDistributionNetworkStrong: null,
    challengeFromCustomer: null,
    lackinginCustomerNeeds: null,
    logisticChallenges: null,
    areaWhereLogisticIssue: null,
    preceivePricing: null,
    priceRelatedConcern: null,
    emergingTrend: null,
    cattleFeedType: null,
    unmetNeeds: null,
    featureOrFormula: null,
    customerDissatisfaction: null,
    criteriaForPartnership: null,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [mobileErrorText, setMobileErrorText] = useState("");
  const [openInCompleteModal, setOpenInCompleteModal] = useState(false);
  const [minimumAnswer, setMinimumAnswer] = useState(false);
  const [submitDialog, setSubmitDialog] = useState(false);
  const [showTags, setShowTags] = useState(true);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const translations = i18n.getResourceBundle(currentLanguage, "translation");

  const checkFieldFilledWithoutError = () => {
    return (
      surveyData.cattleFeedCustomerAppreciate.length > 0 &&
      surveyData.cattleFeedBrand.length > 0 &&
      surveyData.cattleFeedpositiveReputation.length > 0 &&
      surveyData.extensiveDistributionNetwork.length > 0 &&
      surveyData.areaDistributionNetworkStrong.length > 0 &&
      surveyData.challengeFromCustomer.length > 0 &&
      surveyData.lackinginCustomerNeeds.length > 0 &&
      surveyData.logisticChallenges.length > 0 &&
      surveyData.areaWhereLogisticIssue.length > 0 &&
      surveyData.preceivePricing.length > 0 &&
      surveyData.priceRelatedConcern.length > 0 &&
      surveyData.emergingTrend.length > 0 &&
      surveyData.cattleFeedType.length > 0 &&
      surveyData.unmetNeeds.length > 0 &&
      surveyData.featureOrFormula.length > 0 &&
      surveyData.customerDissatisfaction.length > 0 &&
      surveyData.dealerName.length > 0 &&
      surveyData.dealerAddress.length > 0 &&
      surveyData.dealerPhone.length > 0 &&
      surveyData.suggestionAndFeedback.length > 0 &&
      surveyData.improvementOrInnovation.length > 0 &&
      surveyData.criteriaForPartnership.length > 0 &&
      mobileErrorText.length === 0
    );
  };

  const isMininumQuestionAnswered = () => {
    let minCount = 0;
    Object.keys(surveyData).forEach((survey) => {
      if (
        "rateCattleFeed" !== survey &&
        survey !== "customerLoyality" &&
        surveyData[survey].length > 0
      ) {
        minCount += 1;
      }
    });
    return (
      minCount >= 5 &&
      surveyData.dealerName.length > 0 &&
      surveyData.dealerAddress.length > 0
    );
  };

  const handleOnSubmitClick = (e) => {
    e.preventDefault();
    if (!isMininumQuestionAnswered()) {
      setMinimumAnswer(true);
      return;
    }
    const isAllFieldFilledWithoutError = checkFieldFilledWithoutError();
    setMinimumAnswer(false);
    if (!isAllFieldFilledWithoutError) {
      setOpenInCompleteModal(true);
    } else {
      setOpenInCompleteModal(false);
      postSurveyData();
    }
  };

  const postSurveyData = () => {
    setOpenInCompleteModal(false);
    const payload = {
      Strengths: {
        ProductQuality: {
          rateCattleFeed: surveyData.rateCattleFeed,
          cattleFeedCustomerAppreciate: surveyData.cattleFeedCustomerAppreciate,
        },
        BrandReputation: {
          cattleFeedBrand: surveyData.cattleFeedBrand,
          cattleFeedpositiveReputation: surveyData.cattleFeedpositiveReputation,
        },
        DistributionNetwork: {
          extensiveDistributionNetwork: surveyData.extensiveDistributionNetwork,
          areaDistributionNetworkStrong:
            surveyData.areaDistributionNetworkStrong,
        },
      },
      Weaknesses: {
        ChallengesInCurrentProducts: {
          challengeFromCustomer: surveyData.challengeFromCustomer,
          lackinginCustomerNeeds: surveyData.lackinginCustomerNeeds,
        },
        LogisticalIssues: {
          logisticChallenges: surveyData.logisticChallenges,
          areaWhereLogisticIssue: surveyData.areaWhereLogisticIssue,
        },
        PricingConcerns: {
          preceivePricing: surveyData.preceivePricing,
          priceRelatedConcern: surveyData.priceRelatedConcern,
        },
      },
      Opportunities: {
        MarketTrends: {
          emergingTrend: surveyData.emergingTrend,
          cattleFeedType: surveyData.cattleFeedType,
        },
        UnmetCustomerNeeds: {
          unmetNeeds: surveyData.unmetNeeds,
          featureOrFormula: surveyData.featureOrFormula,
        },
      },
      Threats: {
        CustomerLoyalty: {
          customerLoyality: surveyData.customerLoyality,
          customerDissatisfaction: surveyData.customerDissatisfaction,
        },
      },
      General: {
        BasicDetail: {
          dealerName: surveyData.dealerName,
          dealerAddress: surveyData.dealerAddress,
          dealerPhone: surveyData.dealerPhone,
        },
        SuggestionsAndFeedback: {
          suggestionAndFeedback: surveyData.suggestionAndFeedback,
          improvementOrInnovation: surveyData.improvementOrInnovation,
        },
        PartnershipOpportunities: {
          FormingPartnership: surveyData.FormingPartnership,
          criteriaForPartnership: surveyData.criteriaForPartnership,
        },
      },
    };

    submitData(payload);
  };

  const submitData = (payload) => {
    console.log(payload);
    fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((data) => {
        console.log(data);
        resetData()
      })
      .catch((error) => {
        console.error(error);
      });
    setSubmitDialog(true);
  };

  const resetData = () => {
    setSurveyData({
      rateCattleFeed: 0,
      cattleFeedCustomerAppreciate: [],
      cattleFeedBrand: "",
      cattleFeedpositiveReputation: [],
      extensiveDistributionNetwork: "",
      areaDistributionNetworkStrong: [],
      challengeFromCustomer: [],
      lackinginCustomerNeeds: [],
      logisticChallenges: [],
      areaWhereLogisticIssue: [],
      preceivePricing: [],
      priceRelatedConcern: [],
      emergingTrend: [],
      cattleFeedType: [],
      unmetNeeds: [],
      featureOrFormula: [],
      customerLoyality: 0,
      customerDissatisfaction: [],
      dealerName: "",
      dealerAddress: "",
      dealerPhone: "",
      suggestionAndFeedback: "",
      improvementOrInnovation: "",
      FormingPartnership: false,
      criteriaForPartnership: [],
    });
    setMobileErrorText("");
    setOpenInCompleteModal(false);
    setMinimumAnswer(false);
    setSubmitDialog(false);
    setShowTags(false);
  };

  const handleQualityRange = (event, newValue, name) => {
    if (
      sliderData_en[name] === "rateCattleFeed" ||
      sliderData_hn[name] === "rateCattleFeed"
    ) {
      setSurveyData({ ...surveyData, rateCattleFeed: newValue });
    } else if (
      sliderData_en[name] === "customerLoyality" ||
      sliderData_hn[name] === "customerLoyality"
    ) {
      setSurveyData({ ...surveyData, customerLoyality: newValue });
    }
  };

  const setScaleValue = (name) => {
    if (
      sliderData_en[name] === "rateCattleFeed" ||
      sliderData_hn[name] === "rateCattleFeed"
    ) {
      return surveyData.rateCattleFeed;
    } else if (
      sliderData_en[name] === "customerLoyality" ||
      sliderData_hn[name] === "customerLoyality"
    ) {
      return surveyData.customerLoyality;
    }
  };

  const handleChangeWrapper = (name) => (event, newValue) => {
    handleAutocompleteChange(event, newValue, name);
  };

  const handleAutocompleteChange = (event, value, name) => {
    let filteredValue = value.map((v) => {
      return v.value;
    });

    if (
      sliderData_en[name] === "cattleFeedCustomerAppreciate" ||
      sliderData_hn[name] === "cattleFeedCustomerAppreciate"
    ) {
      setSurveyData({
        ...surveyData,
        cattleFeedCustomerAppreciate: filteredValue,
      });
      setShowInput({
        ...showInput,
        cattleFeedCustomerAppreciate: filteredValue.includes("other"),
      });
    } else if (
      sliderData_en[name] === "cattleFeedpositiveReputation" ||
      sliderData_hn[name] === "cattleFeedpositiveReputation"
    ) {
      setSurveyData({
        ...surveyData,
        cattleFeedpositiveReputation: filteredValue,
      });
      setShowInput({
        ...showInput,
        cattleFeedpositiveReputation: filteredValue.includes("other"),
      });
    } else if (
      sliderData_en[name] === "areaDistributionNetworkStrong" ||
      sliderData_hn[name] === "areaDistributionNetworkStrong"
    ) {
      setSurveyData({
        ...surveyData,
        areaDistributionNetworkStrong: filteredValue,
      });
      setShowInput({
        ...showInput,
        areaDistributionNetworkStrong: filteredValue.includes("other"),
      });
    } else if (
      sliderData_en[name] === "challengeFromCustomer" ||
      sliderData_hn[name] === "challengeFromCustomer"
    ) {
      setSurveyData({ ...surveyData, challengeFromCustomer: filteredValue });
      setShowInput({
        ...showInput,
        challengeFromCustomer: filteredValue.includes("other"),
      });
    } else if (
      sliderData_en[name] === "lackinginCustomerNeeds" ||
      sliderData_hn[name] === "lackinginCustomerNeeds"
    ) {
      setSurveyData({ ...surveyData, lackinginCustomerNeeds: filteredValue });
      setShowInput({
        ...showInput,
        lackinginCustomerNeeds: filteredValue.includes("other"),
      });
    } else if (
      sliderData_en[name] === "logisticChallenges" ||
      sliderData_hn[name] === "logisticChallenges"
    ) {
      setSurveyData({ ...surveyData, logisticChallenges: filteredValue });
      setShowInput({
        ...showInput,
        logisticChallenges: filteredValue.includes("other"),
      });
    } else if (
      sliderData_en[name] === "areaWhereLogisticIssue" ||
      sliderData_hn[name] === "areaWhereLogisticIssue"
    ) {
      setSurveyData({ ...surveyData, areaWhereLogisticIssue: filteredValue });
      setShowInput({
        ...showInput,
        areaWhereLogisticIssue: filteredValue.includes("other"),
      });
    } else if (
      sliderData_en[name] === "preceivePricing" ||
      sliderData_hn[name] === "preceivePricing"
    ) {
      setSurveyData({ ...surveyData, preceivePricing: filteredValue });
      setShowInput({
        ...showInput,
        preceivePricing: filteredValue.includes("other"),
      });
    } else if (
      sliderData_en[name] === "priceRelatedConcern" ||
      sliderData_hn[name] === "priceRelatedConcern"
    ) {
      setSurveyData({ ...surveyData, priceRelatedConcern: filteredValue });
      setShowInput({
        ...showInput,
        priceRelatedConcern: filteredValue.includes("other"),
      });
    } else if (
      sliderData_en[name] === "emergingTrend" ||
      sliderData_hn[name] === "emergingTrend"
    ) {
      setSurveyData({ ...surveyData, emergingTrend: filteredValue });
      setShowInput({
        ...showInput,
        emergingTrend: filteredValue.includes("other"),
      });
    } else if (
      sliderData_en[name] === "cattleFeedType" ||
      sliderData_hn[name] === "cattleFeedType"
    ) {
      setSurveyData({ ...surveyData, cattleFeedType: filteredValue });
      setShowInput({
        ...showInput,
        cattleFeedType: filteredValue.includes("other"),
      });
    } else if (
      sliderData_en[name] === "unmetNeeds" ||
      sliderData_hn[name] === "unmetNeeds"
    ) {
      setSurveyData({ ...surveyData, unmetNeeds: filteredValue });
      setShowInput({
        ...showInput,
        unmetNeeds: filteredValue.includes("other"),
      });
    } else if (
      sliderData_en[name] === "featureOrFormula" ||
      sliderData_hn[name] === "featureOrFormula"
    ) {
      setSurveyData({ ...surveyData, featureOrFormula: filteredValue });
      setShowInput({
        ...showInput,
        featureOrFormula: filteredValue.includes("other"),
      });
    } else if (
      sliderData_en[name] === "customerDissatisfaction" ||
      sliderData_hn[name] === "customerDissatisfaction"
    ) {
      setSurveyData({ ...surveyData, customerDissatisfaction: filteredValue });
      setShowInput({
        ...showInput,
        customerDissatisfaction: filteredValue.includes("other"),
      });
    } else if (
      sliderData_en[name] === "criteriaForPartnership" ||
      sliderData_hn[name] === "criteriaForPartnership"
    ) {
      setSurveyData({ ...surveyData, criteriaForPartnership: filteredValue });
      setShowInput({
        ...showInput,
        criteriaForPartnership: filteredValue.includes("other"),
      });
    }
  };

  const handleInputChange = (e, name) => {
    if (
      sliderData_en[name] === "cattleFeedBrand" ||
      sliderData_hn[name] === "cattleFeedBrand"
    ) {
      setSurveyData({ ...surveyData, cattleFeedBrand: e.target.value });
    } else if (
      sliderData_en[name] === "extensiveDistributionNetwork" ||
      sliderData_hn[name] === "extensiveDistributionNetwork"
    ) {
      setSurveyData({
        ...surveyData,
        extensiveDistributionNetwork: e.target.value,
      });
    } else if (
      sliderData_en[name] === "dealerName" ||
      sliderData_hn[name] === "dealerName"
    ) {
      setSurveyData({ ...surveyData, dealerName: e.target.value });
    } else if (
      sliderData_en[name] === "dealerAddress" ||
      sliderData_hn[name] === "dealerAddress"
    ) {
      setSurveyData({ ...surveyData, dealerAddress: e.target.value });
    } else if (
      sliderData_en[name] === "dealerPhone" ||
      sliderData_hn[name] === "dealerPhone"
    ) {
      // eslint-disable-next-line
      const regex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
      setSurveyData({ ...surveyData, dealerPhone: e.target.value });
      if (e.target.value.length !== 10 || !regex.test(e.target.value)) {
        setMobileErrorText(i18n.t(translations.mobileErrorMsg));
      } else {
        setMobileErrorText("");
      }
    } else if (
      sliderData_en[name] === "suggestionAndFeedback" ||
      sliderData_hn[name] === "suggestionAndFeedback"
    ) {
      setSurveyData({ ...surveyData, suggestionAndFeedback: e.target.value });
    } else if (
      sliderData_en[name] === "improvementOrInnovation" ||
      sliderData_hn[name] === "improvementOrInnovation"
    ) {
      setSurveyData({ ...surveyData, improvementOrInnovation: e.target.value });
    }
  };

  const handleOtherInput = (e, en_other, hn_other) => {
    if (e.target.value) {
      if (en_other) {
        setOtherInput({
          ...otherInput,
          [en_other]: e.target.value,
        });
      } else {
        setOtherInput({
          ...otherInput,
          [hn_other]: e.target.value,
        });
      }
    }
  };

  const addOtherInput = (e, en_other, hn_other) => {
    if (otherInput[en_other]) {
      setSurveyData({
        ...surveyData,
        [en_other]: [...surveyData[en_other], otherInput[en_other]],
      });
      setShowInput({
        ...showInput,
        [en_other]: false,
      });
      setOtherInput({
        ...otherInput,
        [en_other]: null,
      });
    } else if (otherInput[hn_other]) {
      setSurveyData({
        ...surveyData,
        [hn_other]: [...surveyData[hn_other], otherInput[hn_other]],
      });
      setShowInput({
        ...showInput,
        [hn_other]: false,
      });
      setOtherInput({
        ...otherInput,
        [hn_other]: null,
      });
    }
  };

  const renderTags = (value, getTagProps) => (
    <>
      {value.map((option, index) => (
        <Chip
          variant="outlined"
          label={option.label}
          size="small"
          {...getTagProps({ index })}
        />
      ))}
    </>
  );
  return (
    <>
      <Dialog
        open={openInCompleteModal}
        onClose={() => setOpenInCompleteModal(false)}
      >
        <DialogTitle id="alert-dialog-title">
          {t(translations.surveyIncompleteTitle)}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t(translations.surveyIncompleteSubtitle)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInCompleteModal(false)} autoFocus>
            {t(translations.cancel)}
          </Button>
          <Button onClick={postSurveyData}>{t(translations.sure)}</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={submitDialog} onClose={resetData}>
        <DialogTitle id="alert-dialog-title">
          {t(translations.submitMsg)}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t(translations.submitMsgSub)}
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Card style={{ borderRadius: "12px" }}>
        <CardContent>
          <Typography
            gutterBottom
            variant={isMobile ? "h4" : "h2"}
            component="div"
            align={isMobile ? "left" : "center"}
            pt={isMobile ? 8 : 4}
          >
            {t("title")}
          </Typography>

          {Object.keys(translations.survey).map((data, index) => {
            return (
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                key={index}
                paddingLeft={isMobile ? 0 : 4}
                paddingTop={4}
              >
                {i18n.t(data)}

                {Object.keys(translations.survey[data]).map((point, index) => {
                  return (
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      key={index}
                      paddingLeft={isMobile ? 1 : 4}
                      paddingTop={4}
                    >
                      {t(point)}:
                      {Object.keys(translations.survey[data][point]).map(
                        (question, index) => {
                          const {
                            name,
                            input,
                            options,
                            minrange,
                            maxrange,
                            isMultiline = true,
                          } = translations.survey[data][point][question];
                          return (
                            <div className="question_section" key={index}>
                              {input !== "scale" && input !== "checkbox" && (
                                <Typography
                                  variant="body1"
                                  className="question_section-question"
                                  mt={2}
                                  mb={2}
                                >
                                  {t(name)}
                                </Typography>
                              )}
                              {input === "radio" && (
                                <Stack spacing={3} paddingBottom={4}>
                                  <Autocomplete
                                  key={showTags}
                                    multiple
                                    id={name}
                                    options={options}
                                    getOptionLabel={(option) => option.label}
                                    disableCloseOnSelect
                                    renderTags={renderTags}
                                    renderOption={(
                                      props,
                                      option,
                                      { selected }
                                    ) => (
                                      <li {...props}>
                                        <Checkbox
                                          icon={<CheckBoxOutlineBlank />}
                                          checkedIcon={<CheckBox />}
                                          style={{ marginRight: 8 }}
                                          checked={selected}
                                        />
                                        {option.label}
                                      </li>
                                    )}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        variant="standard"
                                        placeholder="Select"
                                        className="question_section-question"
                                        InputLabelProps={{
                                          classes: {
                                            root: "question_section-label",
                                            focused: "question_section-label",
                                          },
                                        }}
                                        value={
                                          surveyData[
                                            sliderData_en[name] ||
                                              sliderData_hn[name]
                                          ]
                                        }
                                      />
                                    )}
                                    onChange={handleChangeWrapper(name)}
                                  />

                                  {(showInput[sliderData_en[name]] ||
                                    showInput[sliderData_hn[name]]) && (
                                    <TextField
                                      style={{ paddingBottom: "32px" }}
                                      rows={4}
                                      fullWidth
                                      placeholder={t("enterhere")}
                                      onChange={(e) =>
                                        handleOtherInput(
                                          e,
                                          sliderData_en[name],
                                          sliderData_hn[name]
                                        )
                                      }
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment
                                            position="end"
                                            onClick={(e) =>
                                              addOtherInput(
                                                e,
                                                sliderData_en[name],
                                                sliderData_hn[name]
                                              )
                                            }
                                          >
                                            <Outbox />
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                  )}
                                </Stack>
                              )}

                              {input === "scale" && (
                                <>
                                  <Typography
                                    variant="body1"
                                    className="question_section-question"
                                    mt={2}
                                    mb={2}
                                  >
                                    {t(name)}
                                  </Typography>
                                  <Slider
                                    style={{
                                      color: "rgba(0, 0, 0, 0.87)",
                                      paddingBottom: "32px",
                                    }}
                                    value={setScaleValue(name)}
                                    min={minrange}
                                    step={1}
                                    max={maxrange}
                                    onChange={(event, newValue) =>
                                      handleQualityRange(event, newValue, name)
                                    }
                                    valueLabelDisplay="auto"
                                  />
                                </>
                              )}

                              {(input === "text" || input === "number") && (
                                <TextField
                                  style={{ paddingBottom: "32px" }}
                                  id={
                                    surveyData[
                                      sliderData_en[name] || sliderData_hn[name]
                                    ] + "test"
                                  }
                                  multiline={isMultiline}
                                  type={input === "text" ? input : "tel"}
                                  rows={4}
                                  fullWidth
                                  onChange={(e) => handleInputChange(e, name)}
                                  value={
                                    surveyData[
                                      sliderData_en[name] || sliderData_hn[name]
                                    ]
                                  }
                                  helperText={
                                    input === "number" && mobileErrorText
                                  }
                                  inputProps={
                                    input === "number"
                                      ? {
                                          maxLength: 10,
                                        }
                                      : {}
                                  }
                                />
                              )}

                              {input === "checkbox" && (
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={surveyData.FormingPartnership}
                                        onChange={(e) => {
                                          setSurveyData({
                                            ...surveyData,
                                            FormingPartnership:
                                              e.target.checked,
                                          });
                                        }}
                                      />
                                    }
                                    label={
                                      <Typography
                                        variant="body1"
                                        className="question_section-question"
                                        mt={2}
                                        mb={2}
                                      >
                                        {t(name)}
                                      </Typography>
                                    }
                                  />
                                </FormGroup>
                              )}
                            </div>
                          );
                        }
                      )}
                    </Typography>
                  );
                })}
              </Typography>
            );
          })}

          <Typography variant="body1" padding={isMobile ? 1 : 4}>
            {t("disclaimer")}
          </Typography>

          <Stack
            spacing={2}
            direction="row"
            alignItems={"center"}
            justifyContent={"center"}
            color={"red"}
          >
            <Button
              variant="outlined"
              align="center"
              onClick={handleOnSubmitClick}
            >
              {t("buttonText")}
            </Button>
          </Stack>

          <Snackbar
            open={minimumAnswer}
            autoHideDuration={6000}
            onClose={() => setMinimumAnswer(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <AlertTitle
              elevation={6}
              variant="filled"
              onClose={() => setMinimumAnswer(false)}
              severity="error"
              style={{ color: "red", paddingTop: "4rem", paddingRight: "2px" }}
            >
              {t(translations.minimumError)}
            </AlertTitle>
          </Snackbar>
        </CardContent>
      </Card>
    </>
  );
};

export default SurveyCard;
